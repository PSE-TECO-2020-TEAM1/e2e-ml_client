import { PredictionPageViewProps } from 'components/PredictionPageView';
import assert from 'lib/assert';
import { useAPI, useBoolean, usePromise } from 'lib/hooks';
import { useBareHeader } from 'lib/hooks/Header';
import { useInterval } from 'lib/hooks/Interval';
import { mapPack, State } from 'lib/hooks/Promise';
import { sensorImplementations, SensorName, sensorNameArrayRecordGen, sensorFormats as format } from 'lib/sensors';
import { mode, UnixTimestamp } from 'lib/utils';
import { useEffect, useRef, useState } from 'react';

const SEND_INTERVAL = 200;
const RECEIVE_INTERVAL = 200;
const UNKNOWN_LABEL = 'no prediction yet';

const USER_SELECT = 1000;

const GRAPH_OLD_DISCARD = 5000;

type Data = Record<SensorName, {
    timestamp: UnixTimestamp,
    data: number[]
}[]>;

type Prediction = {
    labels: string[],
    start: UnixTimestamp,
    end: UnixTimestamp
}

type Predictions = {
    allLabels: Prediction[],
    lastMode: string,
    valid: boolean
}

const lastNWindows = (n: number, predictions: Predictions) => {
    if (predictions.allLabels.length < n) return UNKNOWN_LABEL;
    if (!predictions.valid) {
        console.log('calculate again');
        let relevant_labels = [];
        for (let i = 0; i < n; ++i) {
            relevant_labels.push(predictions.allLabels[predictions.allLabels.length - 1 - i].labels);
        }
        predictions.lastMode = mode(relevant_labels);
        predictions.valid = true;
    }
    return predictions.lastMode;
};

const createTable = (predictions: Predictions | undefined) => {
    // if (typeof predictions === 'undefined') return [];

    // const temp = [];
    // const n = USER_SELECT / SEND_INTERVAL;
    
    // for (let index = 0; index < predictions.labels.length - n; index++) {
    //     const label = mode(predictions.labels.slice(index, index + n));
    //     temp.push(label);
    // }
    
    // const arr = [];

    // const singleTime = SEND_INTERVAL;

    // for (const label of temp) {
    //     if (arr.length === 0) {
    //         arr.push({ label, timeframe: [0, singleTime] });
    //         continue;
    //     }

    //     if (arr[arr.length - 1].label === label) { // coalesce
    //         arr[arr.length - 1].timeframe[1] += singleTime;
    //     } else {
    //         arr.push({ label, timeframe: [arr[arr.length - 1].timeframe[1], arr[arr.length - 1].timeframe[1] + singleTime] });
    //     }
    // }

    // return arr

    return [];
};

const usePredictionPage = (predictionId: string): PredictionPageViewProps => {
    const api = useAPI();
    const [isDone, setDone] = useBoolean();
    
    // keep sensor data as a MUTABLE array. Reason: performance suffers hard 
    // when recreating the array from stratch on each sensor update
    const data = useRef<Data>(sensorNameArrayRecordGen());
    const graphData = useRef<Data>(sensorNameArrayRecordGen());

    const [predictions, setPredictions] = useState<Predictions>();


    // use forceUpdate to trigger refreshes on updated ref
    const [,,,forceUpdate] = useBoolean();

    const [state, res, error] = usePromise(() => api.getPredictionConfiguration(predictionId), [predictionId]);
    const sensorsPH = mapPack([state, res, error], v => v.sensors.map(({ name, samplingRate }) => ({ name, rate: samplingRate })));

    const stopSensors = () => {
        if (state !== State.Resolved) throw new Error('sensor configuration not arrived');
        assert(typeof res !== 'undefined');
        const { sensors } = res;
        for (const { name } of sensors) {
            sensorImplementations[name].stop();
        }
    };

    const sendPeriod = () => {
        const start = Math.min(...Object.values(data.current).map(x => x[0]?.timestamp || Infinity));
        const end = Math.max(...Object.values(data.current).map(x => x[x.length - 1]?.timestamp || 0));

        const formattedData = Object.entries(data.current).map(([k, v]) => ({ sensor: k as SensorName, dataPoints: v }))
            .filter(v => v.dataPoints.length !== 0);

        api.predict(predictionId, start, end, formattedData);
        data.current = sensorNameArrayRecordGen();
    };
    
    useEffect(() => {
        // Mounting and initiating sensor collection
        if (state !== State.Resolved) return;
        assert(typeof res !== 'undefined');
        const { sensors } = res;

        for (const { name, samplingRate } of sensors) {
            sensorImplementations[name].onRead(({ data: sampleData, timestamp }) => {
                // mutate!
                data.current[name].push({ timestamp, data: sampleData });

                const first = graphData.current[name][0];
                if (typeof first !== 'undefined' && Date.now() - first.timestamp > GRAPH_OLD_DISCARD) {
                    graphData.current[name].shift();
                }
                graphData.current[name].push({ timestamp, data: sampleData });
                forceUpdate();
            });
            sensorImplementations[name].start(samplingRate);
        }

        return stopSensors;         
    }, [state]);
    
    useInterval(() => {
        // send data at this interval
        if (isDone) return;
        sendPeriod();
    }, SEND_INTERVAL);
    
    useInterval(async () => {
        // receive predictions at this interval
        const pred = await api.getPrediction(predictionId);
        if (pred.labels.length === 0) return;
        setPredictions(old => {
            if (typeof old === 'undefined') {
                const temp = [];
                temp.push(pred);
                return {allLabels: temp, lastMode: '', valid: false};
            };
            old.allLabels.push(pred);
            old.valid = false;
            return old;
        });
    }, RECEIVE_INTERVAL);

    const onStop = () => {
        if (state !== State.Resolved) return;
        stopSensors();
        sendPeriod();
        setDone();
    };

    const onRestart = () => {
        // FIXME: add getPrediction cause of backend quirks
        window.location.reload(); // TODO: handle this better pls
    };

    useBareHeader('Identification');
    return {
        isDone,
        data: graphData.current,
        realtime: predictions ? lastNWindows(USER_SELECT / SEND_INTERVAL, predictions) : UNKNOWN_LABEL, // look at the last 2 elems here // TODO improve
        table: createTable(predictions),
        format,
        sensorsPH,
        onRestart,
        onStop
    };
};

export default usePredictionPage;
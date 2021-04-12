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

const GRAPH_OLD_DISCARD = 5000;

type Data = Record<SensorName, {
    timestamp: UnixTimestamp,
    data: number[]
}[]>;

const createTable = (predictions: string[], start: number, end: number) => {
    const modes = [];
    const n = 10;
    for (let i = 0; i < predictions.length - n + 1; i++) {
        const sliced = predictions.slice(i, i + n);
        modes.push(mode(sliced));
    }
    
    const delta = Math.floor((end - start) / (modes.length));
    const arr = [];
    for (const label of modes) {
        if (arr.length === 0) {
            arr.push({ label, timeframe: [0, delta] });
            continue;
        }

        if (arr[arr.length - 1].label === label) { // coalesce
            arr[arr.length - 1].timeframe[1] += delta;
        } else {
            arr.push({ label, timeframe: [arr[arr.length - 1].timeframe[1], arr[arr.length - 1].timeframe[1] + delta] });
        }
    }

    return arr;
};

const usePredictionPage = (predictionId: string): PredictionPageViewProps => {
    const api = useAPI();
    const [isDone, setDone] = useBoolean();

    const [globalStart, setStart] = useState<number>(NaN);
    const [globalEnd, setEnd] = useState<number>(NaN);
    
    // keep sensor data as a MUTABLE array. Reason: performance suffers hard 
    // when recreating the array from stratch on each sensor update
    const data = useRef<Data>(sensorNameArrayRecordGen());
    const graphData = useRef<Data>(sensorNameArrayRecordGen());

    const [predictions, setPredictions] = useState<string[]>([]);

    // use forceUpdate to trigger refreshes on updated ref
    const [,,,forceUpdate] = useBoolean();

    const [state, res, error] = usePromise(() => {
        api.startPrediction(predictionId);
        const conf = api.getPredictionConfiguration(predictionId);
        return conf;
    }, [predictionId]);
    const sensorsPH = mapPack([state, res, error], v => v.sensors.map(({ name, samplingRate }) => ({ name, rate: samplingRate })));

    const stopSensors = () => {
        if (state !== State.Resolved) throw new Error('sensor configuration did not arrive');
        assert(typeof res !== 'undefined');
        const { sensors } = res;
        for (const { name } of sensors) {
            sensorImplementations[name].stop();
        }
    };

    const sendPeriod = (): number => {
        const start = Math.min(...Object.values(data.current).map(x => x[0]?.timestamp || Infinity));
        const end = Math.max(...Object.values(data.current).map(x => x[x.length - 1]?.timestamp || 0));

        const formattedData = Object.entries(data.current).map(([k, v]) => ({ sensor: k as SensorName, dataPoints: v }))
            .filter(v => v.dataPoints.length !== 0);

        if (formattedData.length === 0) return 0;

        if (globalStart === NaN) setStart(start);

        api.predict(predictionId, start, end, formattedData);
        data.current = sensorNameArrayRecordGen();

        return end;
    };
    
    // Mounting and initiating sensor collection
    useEffect(() => {
        if (state !== State.Resolved) return;
        assert(typeof res !== 'undefined');
        const { sensors } = res;

        for (const { name, samplingRate } of sensors) {
            sensorImplementations[name].onRead(({ data: sampleData, timestamp }) => {
                // mutate!
                data.current[name].push({ timestamp, data: sampleData });

                // remove old values from the graph to increase performance
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
    
    // send data at this interval
    useInterval(() => {
        if (isDone) return;
        sendPeriod();
    }, SEND_INTERVAL);
    
    // receive predictions at this interval
    useInterval(async () => {
        const pred = await api.getPrediction(predictionId);
        if (pred.length === 0) return;
        setPredictions(old => [...old, ...pred]);
    }, RECEIVE_INTERVAL);

    const onStop = () => {
        if (state !== State.Resolved) return;
        stopSensors();
        const end = sendPeriod();
        setEnd(end);
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
        realtime: predictions.length > 0 ? predictions[predictions.length - 1] : UNKNOWN_LABEL,
        table: !isDone ? [] : createTable(predictions, globalStart, globalEnd),
        format,
        sensorsPH,
        onRestart,
        onStop
    };
};

export default usePredictionPage;
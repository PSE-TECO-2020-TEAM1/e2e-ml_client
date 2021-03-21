import { PredictionPageViewProps } from 'components/PredictionPageView';
import assert from 'lib/assert';
import { useAPI, useBoolean, useMountEffect, usePromise } from 'lib/hooks';
import { useBareHeader } from 'lib/hooks/Header';
import { useInterval } from 'lib/hooks/Interval';
import { mapPack, State } from 'lib/hooks/Promise';
import { sensorImplementations, SensorName, sensorNameArrayRecordGen, sensorFormats as format } from 'lib/sensors';
import { mode, UnixTimestamp } from 'lib/utils';
import { useEffect, useRef, useState } from 'react';

const SEND_INTERVAL = 500;
const RECEIVE_INTERVAL = 500;
const UNKNOWN_LABEL = 'Other';

type Data = Record<SensorName, {
    timestamp: UnixTimestamp,
    data: number[]
}[]>;

type Predictions = {
    labels: string[],
    start: UnixTimestamp,
    end: UnixTimestamp,
    lastLabels: string[],
};

const createTable = (predictions: Predictions | undefined) => {
    if (typeof predictions === 'undefined') return [];

    const arr = []
    const time = predictions.end - predictions.start;
    const singleTime = time / predictions.labels.length;

    for (const label of predictions.labels) {
        if (arr.length === 0) {
            arr.push({ label, timeframe: [0, singleTime] })
            continue;
        }

        if (arr[arr.length - 1].label === label) { // coalesce
            arr[arr.length - 1].timeframe[1] += singleTime;
        } else {
            arr.push({ label, timeframe: [arr[arr.length - 1].timeframe[1], arr[arr.length - 1].timeframe[1] + singleTime] });
        }
    }

    return arr;
}

const usePredictionPage = (predictionId: string): PredictionPageViewProps => {
    const api = useAPI();
    const [isDone, setDone] = useBoolean();
    
    // keep sensor data as a MUTABLE array. Reason: performance suffers hard 
    // when recreating the array from stratch on each sensor update
    const data = useRef<Data>(sensorNameArrayRecordGen());

    const [predictions, setPredictions] = useState<Predictions>()


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
    }

    const sendPeriod = () => {
        const start = Math.min(...Object.values(data.current).map(x => x[0]?.timestamp || Infinity));
        const end = Math.max(...Object.values(data.current).map(x => x[x.length - 1]?.timestamp || 0));

        const formattedData = Object.entries(data.current).map(([k, v]) => ({ sensor: k as SensorName, dataPoints: v }))
            .filter(v => v.dataPoints.length !== 0);

        api.predict(predictionId, start, end, formattedData);
        data.current = sensorNameArrayRecordGen();
    }
    
    useEffect(() => {
        // Mounting and initiating sensor collection
        if (state !== State.Resolved) return;
        assert(typeof res !== 'undefined');
        const { sensors } = res;

        for (const { name, samplingRate } of sensors) {
            sensorImplementations[name].onRead(({ data: sampleData, timestamp }) => {
                // mutate!
                data.current[name].push({ timestamp, data: sampleData });
                forceUpdate();
            });
            sensorImplementations[name].start(samplingRate);
        }

        return stopSensors;         
    }, [state]);
    
    useInterval(() => {
        // send data at this interval
        sendPeriod();
    }, SEND_INTERVAL);
    
    useInterval(async () => {
        // receive predictions at this interval
        const pred = await api.getPrediction(predictionId);
        setPredictions(old => {
            if (typeof old === 'undefined') return { ...pred, lastLabels: pred.labels };
            const { labels, start } = old;

            return {
                lastLabels: pred.labels,
                labels: [...labels, ...pred.labels],
                start: start, // keep the old start value,
                end: pred.end // new end value
            };
        });
    }, RECEIVE_INTERVAL);

    const onStop = () => {
        if (state !== State.Resolved) return;
        stopSensors();
        sendPeriod();
        setDone();
    }

    const onRestart = () => {
        // FIXME: add getPrediction cause of backend quirks
        window.location.reload(); // TODO: handle this better pls
    }

    useBareHeader('Identification');
    return {
        isDone,
        data: data.current,
        realtime: predictions ? mode(predictions.lastLabels) : UNKNOWN_LABEL,
        table: createTable(predictions),
        format,
        sensorsPH,
        onRestart,
        onStop
    };
};

export default usePredictionPage;
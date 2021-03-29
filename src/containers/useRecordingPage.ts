import { RecordingPageViewProps } from 'components/RecordingPageView';
import assert from 'lib/assert';
import { useAPI, useBoolean, useCountdown, usePromise } from 'lib/hooks';
import { useBareHeader } from 'lib/hooks/Header';
import { mapPack, State } from 'lib/hooks/Promise';
import { sensorFormats as format, sensorImplementations, SensorName, sensorNameArrayRecordGen } from 'lib/sensors';
import { UnixTimestamp } from 'lib/utils';
import { useQueryParams } from 'raviger';
import { useCallback, useEffect, useRef } from 'react';
import { countdownQueryParam, createCollectionLink, durationQueryParam, labelQueryParam } from 'routes';

type Data = Record<SensorName, {
    timestamp: UnixTimestamp,
    data: number[]
}[]>;

const useRecordingPage = (submissionId: string): RecordingPageViewProps => {
    const api = useAPI();
    const [{ [durationQueryParam]: initDur, [countdownQueryParam]: initCount, [labelQueryParam]: label }] = useQueryParams();

    const [countdown, beginCnt] = useCountdown(parseFloat(initCount) * 1000);
    const [duration, beginDur] = useCountdown(parseFloat(initDur) * 1000);
    const [isRecording, setRecord, clearRecord] = useBoolean(false);
    const [canSend, , clearSend] = useBoolean(true);
    
    // keep sensor data as a MUTABLE array. Reason: performance suffers hard 
    // when recreating the array from stratch on each sensor update
    const data = useRef<Data>(sensorNameArrayRecordGen());
    // use forceUpdate to trigger refreshes on updated ref
    const [,,,forceUpdate] = useBoolean();

    const [state, res, error] = usePromise(() => api.getSubmissionConfiguration(submissionId), [submissionId]);
    const sensorsPH = mapPack([state, res, error], v => v.sensors.map(({ name, samplingRate }) => ({ name, rate: samplingRate })));

    useEffect(() => {
        if (state === State.Resolved) beginCnt();

    // only dependant on loading state
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    useEffect(() => {
        if (isRecording) return;
        if (countdown !== 0) return;
        if (duration === 0) return; // one turn has passed

        // called when starting recording for the first time

        setRecord();
        assert(typeof res !== 'undefined');
        beginDur();

        const { sensors } = res;
        for (const { name, samplingRate } of sensors) {
            sensorImplementations[name].onRead(({ data: sampleData, timestamp }) => {
                // mutate!
                data.current[name].push({ timestamp, data: sampleData });
                forceUpdate();
            });
            sensorImplementations[name].start(samplingRate);
        }
         
    }, [beginDur, countdown, duration, forceUpdate, isRecording, res, setRecord]);

    useEffect(() => {
        if (!isRecording) return;
        if (duration !== 0) return;

        // called when recording should end

        clearRecord();
        assert(typeof res !== 'undefined');

        const { sensors } = res;
        for (const { name } of sensors) {
            sensorImplementations[name].stop();
        }
         
    }, [beginDur, clearRecord, duration, isRecording, res]);

    const onSend = useCallback(async () => {
        clearSend();
        const start = Math.min(...Object.values(data.current).map(x => x[0]?.timestamp || Infinity));
        const end = Math.max(...Object.values(data.current).map(x => x[x.length - 1]?.timestamp || 0));

        const formattedData = Object.entries(data.current).map(([k, v]) => ({ sensor: k as SensorName, dataPoints: v }))
            .filter(v => v.dataPoints.length !== 0);

        await api.submitSample(submissionId, label, start, end, formattedData);
    }, [api, clearSend, label, submissionId]);

    const onRestart = useCallback(() => {
        window.location.reload();
    }, []);

    useBareHeader('Record Data');
    return { onSend, data: data.current, format, label, sensorsPH, isRecording, countdown: countdown / 1000,
        remaining: duration / 1000, isPre: !isRecording && countdown !== 0, canSend,
        reconfigureLink: createCollectionLink(submissionId), onRestart
    };
};

export default useRecordingPage;
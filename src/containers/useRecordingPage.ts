import { RecordingPageViewProps } from 'components/RecordingPageView';
import assert from 'lib/assert';
import { useAPI, useBoolean, useCountdown, usePromise } from 'lib/hooks';
import { mapPack, State } from 'lib/hooks/Promise';
import { sensorConfigurations, sensorImplementations, SensorName, sensorNameArrayRecordGen } from 'lib/sensors';
import { objectMap, UnixTimestamp } from 'lib/utils';
import { useQueryParams } from 'raviger';
import { useEffect, useRef } from 'react';
import { countdownQueryParam, durationQueryParam, labelQueryParam } from 'routes';

type Data = Record<SensorName, {
    timestamp: UnixTimestamp,
    data: number[]
}[]>;

type DataFormat = Record<SensorName, string[]>;
const format: DataFormat = objectMap(sensorConfigurations, obj => obj.format) as DataFormat;

const useRecordingPage = (submissionId: string): RecordingPageViewProps => {
    const api = useAPI();
    const [{ [durationQueryParam]: initDur, [countdownQueryParam]: initCount, [labelQueryParam]: label }] = useQueryParams();
    const [countdown, beginCnt] = useCountdown(parseFloat(initCount) * 1000);
    const [duration, beginDur] = useCountdown(parseFloat(initDur) * 1000);
    const [isRecording, setRecord, clearRecord] = useBoolean(false);
    
    // keep sensor data as a MUTABLE array. Reason: performance suffers hard 
    // when recreating the array from stratch on each sensor update
    const data = useRef<Data>(sensorNameArrayRecordGen());
    // use forceUpdate to trigger refreshes on updated ref
    const [,,,forceUpdate] = useBoolean();

    // const sensorsPHres = res.sensors.map(({ name, samplingRate }) => ({ name, rate: samplingRate }));

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
        for (const { name } of sensors) {
            sensorImplementations[name].onRead(({ data: sampleData, timestamp }) => {
                // mutate!
                data.current[name].push({ timestamp, data: sampleData });
                forceUpdate();
            });
            sensorImplementations[name].start();
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

    return { data: data.current, format, label, sensorsPH, isRecording, countdown: countdown / 1000, remaining: duration / 1000, isPre: !isRecording && countdown !== 0 };
};

export default useRecordingPage;
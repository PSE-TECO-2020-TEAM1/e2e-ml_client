import { WorkspaceSampleDetailsPageViewProps } from 'components/WorkspaceSampleDetailsPageView';
import assert from 'lib/assert';
import { useAPI, useAuth, useBoolean, usePromise } from 'lib/hooks';
import { useHeader } from 'lib/hooks/Header';
import { sensorFormats } from 'lib/sensors';
import { goldenAngleColor, UnixTimestamp } from 'lib/utils';
import { useRef, useState } from 'react';

const useWorkspaceSampleDetailsPage = (workspaceId: string, sampleId: string): WorkspaceSampleDetailsPageViewProps => {
    useHeader({ workspaceId, sampleId });
    useAuth();
    const api = useAPI();
    const [verification, , , flip] = useBoolean();
    const [timeframeState, setFrameState] = useState<0 | 1 | 2>(0); // 0 not listening, 1 listening for 1st, 2 listening for 2nd 
    const temp = useRef<number>();
    const [timeframes, setTimeframes] = useState<{ start: number, end: number }[]>([]);

    const labelsPH = usePromise(async () => {
        const labels = await api.getLabels(workspaceId);
        return labels.map(({ labelId: id, name }) => ({ id, name }));
    }, []);

    const onLabel = async (labelName: string) => {
        await api.setSampleLabel(workspaceId, sampleId, labelName);
        flip();
    };

    const samplePH = usePromise(async () => {
        const { data, end, label, start, timeframes } = await api.getSampleDetails(workspaceId, sampleId);
        setTimeframes(timeframes);

        const d: {name: string, data: [number, number][]}[] = [];

        for (const { sensorName, dataPoints } of data) {
            for (let index = 0; index < sensorFormats[sensorName].length; index++) {
                const element = sensorFormats[sensorName][index];
                d.push({ name: element, data: dataPoints.map(ns => ([ns.timestamp, ns.data[index]])) });
            }
        }

        const ranges = timeframes.map((timeframe) => ({ from: timeframe.start, to: timeframe.end,
            color: timeframe.start === start && timeframe.end === end ? 'transparent' : goldenAngleColor(Math.floor(timeframe.start)),
            del: async () => {
                await api.setSampleTimeframe(workspaceId, sampleId, timeframes.filter(t => t !== timeframe));
                flip();
            }
        }));

        return { end, label, start, points: d, ranges };
    }, [verification]);

    const onGraphClick = async (pos: UnixTimestamp) => {
        if (timeframeState === 0) return;
        if (timeframeState === 2) { // we add now
            assert(typeof temp.current === 'number');
            await api.setSampleTimeframe(workspaceId, sampleId, [...timeframes, { start: temp.current, end: pos }]);
            
            setFrameState(0);
            flip();
            return;
        }

        setFrameState(2);
        temp.current = pos;
    };

    const timeframeAction = () => {
        if (timeframeState !== 0) {
            setFrameState(0);
            return;
        }

        setFrameState(1);
    };

    const timeframeActionName = timeframeState ? 'Cancel' : 'Add timeframe';

    return { labelsPH, onLabel, samplePH, onGraphClick, timeframeAction, timeframeActionName };
};

export default useWorkspaceSampleDetailsPage;
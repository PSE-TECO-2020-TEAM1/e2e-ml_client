import { WorkspaceSampleDetailsPageViewProps } from 'components/WorkspaceSampleDetailsPageView';
import assert from 'lib/assert';
import { useAPI, useAuth, useBoolean, usePromise } from 'lib/hooks';
import { useHeader } from 'lib/hooks/Header';
import { sensorFormats } from 'lib/sensors';
import { goldenAngleColor, UnixTimestamp } from 'lib/utils';
import { useRef, useState } from 'react';

const useWorkspaceSampleDetailsPage = (workspaceId: string, sampleId: string): WorkspaceSampleDetailsPageViewProps => {
    useHeader({ workspaceId, sampleId, dangle: 'Details' });
    useAuth();
    const api = useAPI();
    const [verification, , , flip] = useBoolean();
    const [addOrNot, , clearClick, toggleClick] = useBoolean();
    const [isAdding, setAdd, clearAdd] = useBoolean();
    const temp = useRef<number>();
    const [timeframes, setTimeframes] = useState<{ start: number, end: number }[]>([]);

    const labelsPH = usePromise(async () => {
        const labels = await api.getLabels(workspaceId);
        return labels.map(({ labelId: id, name }) => ({ id, name }));
    }, []);

    const onLabel = async (labelId: string) => {
        await api.setSampleLabel(workspaceId, sampleId, labelId);
        flip();
    };

    const samplePH = usePromise(async () => {
        const { data, end, label, start, timeframes } = await api.getSampleDetails(workspaceId, sampleId);
        setTimeframes(timeframes);

        const d: {name: string, data: [number, number][]}[] = [];

        console.log(data);

        for (const { sensorName, dataPoints } of data) {
            for (let index = 0; index < sensorFormats[sensorName].length; index++) {
                const element = sensorFormats[sensorName][index];
                d.push({ name: element, data: dataPoints.map(ns => ([ns.timestamp, ns.data[index]])) });
            }
        }

        const ranges = timeframes.map(({ start: st, end: ed }) => ({ from: st, to: ed,
            color: st === start && ed === end ? 'transparent' : goldenAngleColor(Math.floor(st)),
            del: async () => {
                await api.setSampleTimeframe(workspaceId, sampleId, timeframes.filter(t => !(t.start === st && t.end === end)));
                flip();
            }
        }));

        return { end, label, start, points: d, ranges };
    }, [verification]);

    const onGraphClick = async (pos: UnixTimestamp) => {
        if (!isAdding) return;
        console.log(pos, addOrNot);
        if (addOrNot === true) { // we add now
            assert(typeof temp.current === 'number');
            const t = temp.current;
            temp.current = NaN;
            console.log('aaddddd');
            await api.setSampleTimeframe(workspaceId, sampleId, [...timeframes, { start: t, end: pos }]);
            flip();
            
            toggleClick();
            return;
        }

        temp.current = pos;
        clearAdd();
        toggleClick();
    };

    const timeframeAction = () => {
        if (isAdding) {
            clearClick();
            clearAdd();
            return;
        }

        setAdd();
    };

    const timeframeActionName = isAdding ? 'Cancel' : 'Add timeframe';

    return { labelsPH, onLabel, samplePH, onGraphClick, timeframeAction, timeframeActionName };
};

export default useWorkspaceSampleDetailsPage;
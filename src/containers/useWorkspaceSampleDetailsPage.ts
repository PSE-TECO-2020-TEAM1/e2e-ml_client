import { WorkspaceSampleDetailsPageViewProps } from 'components/WorkspaceSampleDetailsPageView';
import { useAPI, useAuth, useBoolean, usePromise } from 'lib/hooks';
import { useHeader } from 'lib/hooks/Header';
import { sensorFormats } from 'lib/sensors';

const useWorkspaceSampleDetailsPage = (workspaceId: string, sampleId: string): WorkspaceSampleDetailsPageViewProps => {
    useHeader({ workspaceId, sampleId, dangle: 'Details' });
    useAuth();
    const api = useAPI();
    const [verification, , , flip] = useBoolean();

    const labelsPH = usePromise(async () => {
        const labels = await api.getLabels(workspaceId);
        return labels.map(({ labelId: id, name }) => ({ id, name }));
    }, []);

    const onLabel = async (labelId: string) => {
        await api.setSampleLabel(workspaceId, sampleId, labelId);
        flip();
    };

    const samplePH = usePromise(async () => {
        const { data, end, label, start } = await api.getSampleDetails(workspaceId, sampleId);

        const d: {name: string, data: [number, number][]}[] = [];

        console.log(data);

        for (const { sensorName, dataPoints } of data) {
            for (let index = 0; index < sensorFormats[sensorName].length; index++) {
                const element = sensorFormats[sensorName][index];
                d.push({ name: element, data: dataPoints.map(ns => ([ns.timestamp, ns.data[index]])) });
            }
        }

        return { end, label, start, points: d };
    }, [verification]);

    return { labelsPH, onLabel, samplePH };
};

export default useWorkspaceSampleDetailsPage;
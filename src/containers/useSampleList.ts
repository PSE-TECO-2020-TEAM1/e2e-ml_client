import { SampleListProps } from 'components/SampleList';
import { useAPI, useInvalidator, usePromise } from 'lib/hooks';
import { collectRoute, sampleRoute } from 'routes';

const useSampleList = (workspaceId: string): SampleListProps => {
    const collectDataHref = collectRoute(workspaceId);
    const api = useAPI();

    const [validity, flip] = useInvalidator();

    const samplesPH = usePromise(async () =>
        (await api.getSampleIds(workspaceId))
            .map(id => {
                return ({ id, href: sampleRoute(workspaceId, id) });
            })
    , [workspaceId, validity]);

    const onSampleDelete = async (id: string) => {
        await api.deleteSample(workspaceId, id);
        flip();
    };

    return { collectDataHref, samplesPH, onSampleDelete };
};

export default useSampleList;
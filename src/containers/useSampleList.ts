import { SampleListProps } from 'components/SampleList';
import { useAPI, useBoolean, usePromise } from 'lib/hooks';
import { useEffect } from 'react';
import { collectRoute, sampleRoute } from 'routes';

const SAMPLE_UPDATE_INTERVAL = 1000;

const useSampleList = (workspaceId: string): SampleListProps => {
    const [validity, , , flip] = useBoolean();

    const collectDataHref = collectRoute(workspaceId);
    const api = useAPI();
    const samplesPH = usePromise(async () =>
        (await api.getSampleIds(workspaceId))
            .map(id => {
                // console.log('sample id', id);
                return ({ id, href: sampleRoute(workspaceId, id) });
            })
    , [workspaceId, validity]);
    const onSampleDelete = async (id: string) => {
        await api.deleteSample(workspaceId, id);
        flip();
    };

    useEffect(() => {
        const int = setInterval(flip, SAMPLE_UPDATE_INTERVAL);
        return () => {
            clearInterval(int);
        };
    }, [workspaceId, flip]);

    return { collectDataHref, samplesPH,  onSampleDelete };
};

export default useSampleList;
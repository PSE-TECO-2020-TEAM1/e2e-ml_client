import { SampleListProps } from 'components/SampleList';
import { useAPI, usePromise } from 'lib/hooks';
import { collectRoute } from 'routes';

const useSampleList = (workspaceId: string): SampleListProps => {
    const collectDataHref = collectRoute(workspaceId);
    const api = useAPI();
    const samplesPH = usePromise(async () => api.getSamples())


    return { collectDataHref, samplesPH, onSampleDelete };
};

export default useSampleList;
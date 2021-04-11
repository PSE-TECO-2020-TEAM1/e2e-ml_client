import { WorkspaceCollectDataPageViewProps } from 'components/WorkspaceCollectDataPageView';
import { toaster } from 'evergreen-ui';
import { useAPI, useAuth, usePromise } from 'lib/hooks';
import { useHeader } from 'lib/hooks/Header';
import { createCollectionLink } from 'routes';

const useWorkspaceCollectDataPage = (workspaceId: string): WorkspaceCollectDataPageViewProps => {
    useAuth();
    useHeader({ workspaceId, dangle: 'Collect Data' });
    const api = useAPI();

    usePromise(async () => {
        const labels = await api.getLabels(workspaceId);
        if (labels.length === 0) {
            toaster.warning('You don\'t have any labels yet, please create at least one before collecting samples.');
        }
    }, [workspaceId]);

    const collectLinkPH = usePromise(async () => createCollectionLink(await api.getDataCollectionID(workspaceId)), [workspaceId]);

    return { collectLinkPH };
};

export default useWorkspaceCollectDataPage;

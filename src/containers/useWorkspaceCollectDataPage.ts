import { WorkspaceCollectDataPageViewProps } from 'components/WorkspaceCollectDataPageView';
import { useAPI, useAuth, usePromise } from 'lib/hooks';
import { useHeader } from 'lib/hooks/Header';
import { createCollectionLink } from 'routes';

const useWorkspaceCollectDataPage = (workspaceId: string): WorkspaceCollectDataPageViewProps => {
    useAuth();
    useHeader({ workspaceId, dangle: 'Collect Data' });
    const api = useAPI();

    const collectLinkPH = usePromise(async () => createCollectionLink(await api.getDataCollectionID(workspaceId)), [workspaceId]);

    return { collectLinkPH };
};

export default useWorkspaceCollectDataPage;

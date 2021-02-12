import { WorkspaceCollectDataPageViewProps } from 'components/WorkspaceCollectDataPageView';
import { useAPI, useAuth, usePromise } from 'lib/hooks';
import { createCollectionLink } from 'routes';

const useWorkspaceCollectDataPage = (workspaceId: string): WorkspaceCollectDataPageViewProps => {
    useAuth();
    const api = useAPI();

    const collectLinkPH = usePromise(async () => createCollectionLink(await api.getDataCollectionID(workspaceId)), [workspaceId]);

    return { collectLinkPH };
};

export default useWorkspaceCollectDataPage;

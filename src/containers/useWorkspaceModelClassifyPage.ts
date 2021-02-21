import { WorkspaceModelClassifyPageViewProps } from 'components/WorkspaceModelClassifyPageView';
import { useAPI, useAuth, usePromise } from 'lib/hooks';
import { useHeader } from 'lib/hooks/Header';
import { createClassificationLink } from 'routes';

const useWorkspaceModelClassifyPage = (workspaceId: string, modelId: string): WorkspaceModelClassifyPageViewProps => {
    useHeader({ workspaceId, modelId, dangle: 'Classify' });
    useAuth();
    const api = useAPI();

    const classifyLinkPH = usePromise(async () => createClassificationLink(await api.getPredictionID(workspaceId, modelId)), [workspaceId]);

    return { classifyLinkPH };
};

export default useWorkspaceModelClassifyPage;

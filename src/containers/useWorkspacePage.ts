import { WorkspacePageViewProps } from 'components/WorkspacePageView';
import { useAuth } from 'lib/hooks';
import { labelsRoute, modelsRoute } from 'routes';
import useSampleList from './useSampleList';

const useWorkspacePage = (workspaceId: string): WorkspacePageViewProps => {
    useAuth();
    const modelsHref = modelsRoute(workspaceId);
    const labelsHref = labelsRoute(workspaceId);
    const sampleProps = useSampleList(workspaceId);
    return { sampleProps, modelOptionsProps: {}, labelsHref, modelsHref };
};

export default useWorkspacePage;
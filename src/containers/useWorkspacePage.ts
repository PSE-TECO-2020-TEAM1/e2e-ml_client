import { WorkspacePageViewProps } from 'components/WorkspacePageView';
import { useAuth } from 'lib/hooks';
import { useHeader } from 'lib/hooks/Header';

import useSampleList from './useSampleList';
import useModelOptions from './useModelOptions';
import useWorkspaceLabelsPage from 'containers/useWorkspaceLabels';
import useWorkspaceModelsPage from 'containers/useWorkspaceModels';

const useWorkspacePage = (workspaceId: string): WorkspacePageViewProps => {
    useHeader({ workspaceId });
    useAuth();

    const sampleProps = useSampleList(workspaceId);
    const modelOptionsProps = useModelOptions(workspaceId);
    const labelsProps = useWorkspaceLabelsPage(workspaceId);
    const modelsProps = useWorkspaceModelsPage(workspaceId);

    return { sampleProps, modelOptionsProps, labelsProps, modelsProps };
};

export default useWorkspacePage;
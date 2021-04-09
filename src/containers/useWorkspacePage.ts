import { WorkspacePageViewProps } from 'components/WorkspacePageView';
import { useAPI, useAuth } from 'lib/hooks';
import { useHeader } from 'lib/hooks/Header';

import useSampleList from './useSampleList';
import useWorkspaceLabelsPage from 'containers/useWorkspaceLabels';
import useWorkspaceModelsPage from 'containers/useWorkspaceModels';
import { useState } from 'react';
import { navigate } from 'raviger';
import { modelOptions, workspacesListRoute } from 'routes';

const useWorkspacePage = (workspaceId: string): WorkspacePageViewProps => {
    useAuth();
    const header = useHeader({ workspaceId });
    const api = useAPI();

    const [renameName, setRenameName] = useState('');

    const sampleProps = useSampleList(workspaceId);
    const labelsProps = useWorkspaceLabelsPage(workspaceId);
    const modelsProps = useWorkspaceModelsPage(workspaceId);

    const onDeleteClick = async () => {
        await api.deleteWorkspace(workspaceId);
        navigate(workspacesListRoute);
    };

    const onRenameClick = async () => {
        await api.renameWorkspace(workspaceId, renameName);
        setRenameName('');
        header({ workspaceId });
    };

    const modelCreateHref = modelOptions(workspaceId);

    return {
        sampleProps, labelsProps, modelsProps,
        workspaceRename: renameName,
        onWorkspaceRenameChange: setRenameName,
        onDeleteClick,
        onRenameClick,
        modelCreateHref
    };
};

export default useWorkspacePage;
import { WorkspacePageViewProps } from 'components/WorkspacePageView';
import { useAPI, useAuth } from 'lib/hooks';
import { useHeader } from 'lib/hooks/Header';

import useSampleList from './useSampleList';
import useWorkspaceLabelsPage from 'containers/useWorkspaceLabels';
import useWorkspaceModelsPage from 'containers/useWorkspaceModels';
import { useState } from 'react';
import { navigate } from 'raviger';
import { modelOptions, workspacesListRoute } from 'routes';
import useTrainingState from 'lib/hooks/TrainingState';
import { DYNAMIC_UPDATE_INTERVAL } from 'config';
import { TrainingStateEnum } from 'lib/API/DesktopAPI';

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

    const training = useTrainingState(workspaceId, DYNAMIC_UPDATE_INTERVAL);

    return {
        sampleProps, labelsProps, modelsProps,
        workspaceRename: renameName,
        onWorkspaceRenameChange: setRenameName,
        onDeleteClick,
        onRenameClick,
        modelCreateHref,
        training: [TrainingStateEnum.NO_TRAINING_YET, null]
    };
};

export default useWorkspacePage;
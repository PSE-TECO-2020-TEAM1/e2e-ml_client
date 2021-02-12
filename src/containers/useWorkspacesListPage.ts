import { useCallback } from 'react';
import { useAPI, useAuth, useBoolean } from 'lib/hooks';
import usePromise from 'lib/hooks/Promise';
import { workspaceRoute } from 'routes';
import { SensorOptions } from 'lib/API';
import useWorkspaceCreationState from './useWorkspaceCreation';
import { WorkspaceListPageProps } from 'components/WorkspacesListPageView';

console.log('only one plzzzzz');

const useWorkspacesListPage = (): WorkspaceListPageProps => {
    useAuth();
    const [validity, , , flipValidation] = useBoolean(false);
    const api = useAPI();

    // invalidate current list after creating new one
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const workspacesPH = usePromise(async () => (await api.getWorkspaces()).map(({ name, id }) => ({ text: name, href: workspaceRoute(id) })), [validity]);

    const createWorkspace = useCallback(async (name: string, sensors: SensorOptions[]) => {
        const res = await api.createWorkspace(name, sensors);
        flipValidation();
        return res;
    }, [api, flipValidation]);

    const workspaceCreation = useWorkspaceCreationState(createWorkspace);

    return { workspacesPH, workspaceCreationProps: workspaceCreation };

    // <Link href={workspaceRoute(id)}>{name}</Link>
};

export default useWorkspacesListPage;

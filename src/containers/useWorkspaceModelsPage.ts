import { WorkspaceModelsPageViewProps } from 'components/WorkspaceModelsPageView';
import { useAPI, useAuth, useCounter, usePromise } from 'lib/hooks';
import { classifyRoute, modelDetailsRoute } from 'routes';

const useWorkspaceModelsPage = (workspaceId: string): WorkspaceModelsPageViewProps => {
    useAuth();
    const api = useAPI();
    const [validity, flip] = useCounter();

    const onDelete = (id: string) => async () => {
        await api.deleteModel(workspaceId, id);
        flip();
    };

    // const onNameChange = (id: string) => async (str: string) => {
    //     await api.renameModel(workspaceId, id, str);
    //     flip();
    // };

    const modelsPH = usePromise(async() => 
        (await api.getModels(workspaceId))
            .map(({ name, id }) => {
                const href = classifyRoute(workspaceId, id);
                const modelDetailsHref = modelDetailsRoute(workspaceId, id);
                return {
                    name, id, href, modelDetailsHref,
                    // onNameChange: onNameChange(id),
                    onDelete: onDelete(id)
                };
            })
    , [validity]);

    return { modelsPH };
}; 

export default useWorkspaceModelsPage;
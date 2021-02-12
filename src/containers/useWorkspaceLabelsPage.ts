import { WorkspaceLabelsPageViewProps } from 'components/WorkspaceLabelsPageView';
import { useAPI, useAuth, useBoolean, usePromise } from 'lib/hooks';
import { useCallback, useState } from 'react';

const useWorkspaceLabelsPage = (workspaceId: string): WorkspaceLabelsPageViewProps => {
    useAuth();
    const api = useAPI();
    const [validity, , ,flip] = useBoolean();

    const [name, setName] = useState<string>('');
    const onName = useCallback((str: string) => setName(str), []);
    const onCreate = useCallback(async () => {
        const pr = api.createLabel(workspaceId, name);
        setName('');
        await pr;
        flip();
    }, [api, name, workspaceId, flip]);
    const onDeleteLabel = useCallback(async (id: string) => {
        await api.deleteLabel(workspaceId, id);
        flip();
    }, [api, workspaceId, flip]);

    const labelsPH = usePromise(async() => 
        (await api.getLabels(workspaceId))
            .map(({ name, sampleCount: count, labelId: id, description: desc }) => ({ name, count, id, desc }))
    , [validity]);

    return { name, onName, onCreate, onDeleteLabel, labelsPH };
}; 

export default useWorkspaceLabelsPage;
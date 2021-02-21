import { WorkspaceLabelsPageViewProps } from 'components/WorkspaceLabelsPageView';
import { useAPI, useAuth, useCounter, usePromise } from 'lib/hooks';
import { useHeader } from 'lib/hooks/Header';
import { useCallback, useState } from 'react';

const useWorkspaceLabelsPage = (workspaceId: string): WorkspaceLabelsPageViewProps => {
    useHeader({ workspaceId, dangle: 'Labels' });
    useAuth();
    const api = useAPI();
    const [validity, flip] = useCounter();

    const [createName, setName] = useState<string>('');
    const onCreateName = useCallback((str: string) => setName(str), []);
    const onCreate = useCallback(async () => {
        const pr = api.createLabel(workspaceId, createName);
        setName('');
        await pr;
        flip();
    }, [api, createName, workspaceId, flip]);
    const onDeleteLabel = useCallback(async (id: string) => {
        await api.deleteLabel(workspaceId, id);
        flip();
    }, [api, workspaceId, flip]);

    const onNameChange = (id: string) => async (str: string) => {
        await api.renameLabel(workspaceId, id, str);
        flip();
    };

    const onDescChange = (id: string) => async (str: string) => {
        await api.describeLabel(workspaceId, id, str);
        flip();
    };

    const labelsPH = usePromise(async() => 
        (await api.getLabels(workspaceId))
            .map(({ name, sampleCount: count, labelId: id, description: desc }) => {
                return {
                    name, count, id, desc,
                    onNameChange: onNameChange(id),
                    onDescChange: onDescChange(id)
                };
            })
    , [validity]);

    return { createName, onCreateName, onCreate, onDeleteLabel, labelsPH };
}; 

export default useWorkspaceLabelsPage;
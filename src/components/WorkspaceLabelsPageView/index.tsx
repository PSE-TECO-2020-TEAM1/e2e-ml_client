import { TextInput } from 'components/TextField';
import { Promised, PromisePack } from 'lib/hooks/Promise';
import React from 'react';

type Label = { name: string, count: number, id: string, desc: string };

export type WorkspaceLabelsPageViewProps = {
    labelsPH: PromisePack<Label[]>,
    name: string,
    onName: (s: string) => void | Promise<void>,
    onCreate: () => void | Promise<void>,
    onDeleteLabel: (id: string) => void | Promise<void>
}

const WorkspaceLabelsPageView = ({ labelsPH, name, onName, onDeleteLabel, onCreate }: WorkspaceLabelsPageViewProps) => <>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Labels</th>
                <th>Description</th>
                <th>Samples</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <Promised promise={labelsPH} pending={
                <tr>
                    <td>?</td>
                    <td>loading...</td>
                    <td>loading...</td>
                    <td>0</td>
                    <td></td>
                </tr>
            }>{labels => labels.map(({name, count, id, desc}, i) =>
                    <tr key={name}>
                        <td>{i}</td>
                        <td>{name}</td>
                        <td>{desc}</td>
                        <td>{count}</td>
                        <td><button onClick={() => onDeleteLabel(id)}>DEL</button></td>
                    </tr>
                )}
            </Promised>
        </tbody>
        <tfoot>
            <tr>
                <td></td>
                <td><TextInput value={name} onType={onName}/></td>
                <td><button onClick={onCreate}>CREATE</button></td>
                <td></td>
            </tr>
        </tfoot>
    </table>
    
</>;

export default WorkspaceLabelsPageView;
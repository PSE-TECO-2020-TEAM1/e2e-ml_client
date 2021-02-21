import { Promised, PromisePack } from 'lib/hooks/Promise';
import { Link } from 'raviger';
import React from 'react';
import styles from './index.module.scss';
import Wrapper from 'components/Wrapper';
const { main } = styles;

export type Model = {
    name: string,
    id: string,
    href: string,
    modelDetailsHref: string,
    // onNameChange: (n: string) => void | Promise<void>,
    onDelete: () => void | Promise<void>
};

export type WorkspaceModelsPageViewProps = {
    modelsPH: PromisePack<Model[]>,
}

const WorkspaceModelsPageView = ({
    modelsPH,
}: WorkspaceModelsPageViewProps) => <Wrapper className={main}>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Models</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <Promised promise={modelsPH} pending={
                <tr>
                    <td>?</td>
                    <td>loading...</td>
                    <td></td>
                    <td></td>
                </tr>
            }>{m => m.map(({name, id, href, modelDetailsHref, onDelete}, i) =>
                    <tr key={name}>
                        <td>{i}</td>
                        <td><Link href={modelDetailsHref}>{name}</Link></td>
                        {/* <td><CovertTextInput value={name} onChange={onNameChange}/></td> */}
                        <td><button onClick={onDelete}>DEL</button></td>
                        <td><Link href={href}><button>QR</button></Link></td>
                    </tr>
                )}
            </Promised>
        </tbody>
    </table>
    
</Wrapper>;

export default WorkspaceModelsPageView;
import React from 'react';
import { Promised, PromisePack } from 'lib/hooks/Promise';

import Wrapper from 'components/Wrapper';

import styles from './index.module.scss';
import Loading from 'components/Loading';
import { Link } from 'raviger';
import WorkspaceCreation, { WorkspaceCreationProps } from 'components/WorkspaceCreation';
const { main, workspace } = styles;

export type WorkspaceListPageProps = {
    workspaceCreationProps: WorkspaceCreationProps,
    workspacesPH: PromisePack<{ text: string, href: string }[]>
}

const WorkspacesListPage = ({ workspacesPH, workspaceCreationProps }: WorkspaceListPageProps) => {
    return (
        <Wrapper className={main}>
            <section>
                <Promised promise={workspacesPH} pending={<Loading />} >{w =>
                    w.map(({ text, href }) =>
                        <Link className={workspace} key={text} href={href}>{text}</Link>)
                }</Promised>
            </section>
            <aside>
                <WorkspaceCreation {...workspaceCreationProps}/>
            </aside>
        </Wrapper>
    );
};

export default WorkspacesListPage;

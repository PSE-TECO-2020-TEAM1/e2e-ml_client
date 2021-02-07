import React from 'react';
import { Promised, PromisePack } from 'lib/hooks/Promise';

import Wrapper from 'components/Wrapper';

import styles from './index.module.scss';
import Loading from 'components/Loading';
import { Link } from 'raviger';
import WorkspaceCreation, { WorkspaceCreationProps } from 'components/WorkspaceCreation';
const { main, workspaceButton } = styles;

export type WorkspaceListPageProps = {
    workspaceCreationProps: WorkspaceCreationProps,
    workspacesPH: PromisePack<{ text: string, href: string }[]>
}

const WorkspacesListPage = ({ workspacesPH, workspaceCreationProps }: WorkspaceListPageProps) => {
    return (
        <Wrapper className={main}>
            <section>
                <Promised promise={workspacesPH} pending={<Loading />} >{w =>
                    w.map(({ text, href }) => <div key={text}>
                        <Link href={href}>{text}</Link>
                    </div>)
                }</Promised>
            </section>
            <section>
                <WorkspaceCreation {...workspaceCreationProps}/>
            </section>
        </Wrapper>
    );
};

export default WorkspacesListPage;

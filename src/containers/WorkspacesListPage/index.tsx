import React, { useCallback } from 'react';
import { useAPI, useAuth, useBoolean } from 'lib/hooks';
import usePromise, { Promised } from 'lib/hooks/Promise';

import Wrapper from 'components/Wrapper';

import styles from './index.module.scss';
import Loading from 'components/Loading';
import { Link } from 'raviger';
import { workspaceRoute } from 'routes';
import TextField from 'components/TextField';
import { ISensor } from 'lib/API';
import WorkspaceCreation from 'containers/WorkspaceCreation';
const { main, workspaceButton } = styles;

const WorkspacesListPage = () => {
    useAuth();
    const [validity, , , flipValidation] = useBoolean(false);
    const api = useAPI();
    // invalidate current list after creating new one
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const workspacesPH = usePromise(useCallback(() => api.getWorkspaces(), [api, validity]));

    const createWorkspace = useCallback(async (name: string, sensors: ISensor[]) => {
        const res = await api.createWorkspace(name, sensors);
        flipValidation();
        return res;
    }, [api, flipValidation]);

    return (
        <Wrapper className={main}>
            <section>
                <Promised promise={workspacesPH} pending={<Loading />} >{workspaces =>
                    workspaces.map(({ name, id }) => <div key={id}>
                        <Link href={workspaceRoute(id)}>{name}</Link>
                    </div>)
                }</Promised>
            </section>
            <section>
                <WorkspaceCreation
                    create={createWorkspace}
                />
            </section>
        </Wrapper>
    );
};

export default WorkspacesListPage;

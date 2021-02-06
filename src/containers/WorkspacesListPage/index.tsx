import React from 'react';
import { useAuth } from 'lib/hooks';

import Wrapper from 'components/Wrapper';

import styles from './index.module.scss';
const { main, workspaceButton } = styles;

const WorkspacesListPage = () => {
    useAuth();

    return (
        <Wrapper className={main}>
            Placeholder, workspacesList
            {/* {[1,1,1,1,1,1].map((x, i) => )} */}
        </Wrapper>
    );
};

export default WorkspacesListPage;

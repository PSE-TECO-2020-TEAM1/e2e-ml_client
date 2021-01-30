import React from 'react';
import { useAuth } from 'lib/hooks';

import Wrapper from 'components/Wrapper';

import styles from './index.module.scss';
const { main } = styles;

const WorkspacesListPage = () => {
    useAuth();

    return (
        <Wrapper className={main}>

        </Wrapper>
    );
};

export default WorkspacesListPage;

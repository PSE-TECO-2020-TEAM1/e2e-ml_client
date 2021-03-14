import Wrapper from 'components/Wrapper';
import React from 'react';

import styles from './index.module.scss';
const { emoji} = styles;

const FourOhFourPage = () => {
    return (<Wrapper>
        <div className={emoji}>😑</div>
        <div>This page has never ever existed before.</div>
    </Wrapper>);
};

export default FourOhFourPage;

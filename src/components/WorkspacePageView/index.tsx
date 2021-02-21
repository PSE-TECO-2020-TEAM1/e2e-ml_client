import ModelOptions, { ModelOptionsProps } from 'components/ModelOptions';
import SampleList, { SampleListProps } from 'components/SampleList';
import Wrapper from 'components/Wrapper';
import { Link } from 'raviger';
import React from 'react';
import styles from './index.module.scss';
const { main, samples, options, labBut, modBut } = styles;

export type WorkspacePageViewProps = {
    sampleProps: SampleListProps,
    modelOptionsProps: ModelOptionsProps,
    labelsHref: string,
    modelsHref: string,
}

const WorkspacePageView = ({ sampleProps, modelOptionsProps, labelsHref, modelsHref }: WorkspacePageViewProps) => <Wrapper className={main}>
    <div className={samples}>
        <SampleList {...sampleProps} />
    </div>
    <aside>
        <Link href={labelsHref}><button className={labBut} >Labels</button></Link>
        <Link href={modelsHref}><button className={modBut} >Models</button></Link>
        <div className={options}>
            <ModelOptions {...modelOptionsProps} />
        </div>
    </aside>
</Wrapper>;

export default WorkspacePageView;
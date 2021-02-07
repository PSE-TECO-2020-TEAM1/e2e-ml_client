import ModelOptions, { ModelOptionsProps } from 'components/ModelOptions';
import SampleList, { SampleListProps } from 'components/SampleList';
import Wrapper from 'components/Wrapper';
import { Link } from 'raviger';
import React from 'react';

export type WorkspacePageViewProps = {
    sampleProps: SampleListProps,
    modelOptionsProps: ModelOptionsProps,
    labelsHref: string,
    modelsHref: string,
}

const WorkspacePageView = ({ sampleProps, modelOptionsProps, labelsHref, modelsHref }: WorkspacePageViewProps) => <Wrapper>
    <SampleList {...sampleProps} />
    <Link href={labelsHref}>Labels</Link>
    <Link href={modelsHref}>Models</Link>
    <ModelOptions {...modelOptionsProps} />
</Wrapper>;

export default WorkspacePageView;
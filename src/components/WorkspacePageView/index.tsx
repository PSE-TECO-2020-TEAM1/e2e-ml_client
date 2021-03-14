import React from 'react';
import ModelOptions, { ModelOptionsProps } from 'components/ModelOptions';
import SampleList, { SampleListProps } from 'components/SampleList';
import { Pane, Button, majorScale, SideSheet, Heading } from 'evergreen-ui';
import { useBoolean } from 'lib/hooks';
import WorkspaceModels, { WorkspaceModelsProps } from 'components/WorkspaceModels';
import WorkspaceLabels, { WorkspaceLabelsProps } from 'components/WorkspaceLabels';

export type WorkspacePageViewProps = {
    sampleProps: SampleListProps,
    modelOptionsProps: ModelOptionsProps,
    modelsProps: WorkspaceModelsProps,
    labelsProps: WorkspaceLabelsProps,
}

const WorkspacePageView = ({ sampleProps, modelOptionsProps, labelsProps, modelsProps }: WorkspacePageViewProps) => {
    const [isShown, setShown, clearShown] = useBoolean();
    return <Pane display="grid" gridTemplateColumns="640px 640px" justifyContent="space-evenly" gap={majorScale(4)}>
        <SideSheet
            isShown={isShown}
            onCloseComplete={clearShown}
        >
            <ModelOptions {...modelOptionsProps} />
        </SideSheet>
        <Pane display="flex" gap={majorScale(4)} flexDirection="column">
            <Heading>Collected Samples</Heading>
            <Pane elevation={1}>
                <SampleList {...sampleProps} />
            </Pane>
        </Pane>
        <Pane display="flex" gap={majorScale(4)} flexDirection="column">
            <Heading>Workspace Models</Heading>
            <Pane display="flex" flexDirection="column" gap={majorScale(1)} elevation={1}>
                <WorkspaceModels {...modelsProps} />
                <Button marginRight={majorScale(2)} marginBottom={majorScale(1)} alignSelf="flex-end" appearance="primary" onClick={setShown}>Create new model</Button>
            </Pane>
            <Heading>Workspace Labels</Heading>
            <Pane elevation={1}>
                <WorkspaceLabels {...labelsProps} />
            </Pane>
        </Pane>
    </Pane>;
};

export default WorkspacePageView;
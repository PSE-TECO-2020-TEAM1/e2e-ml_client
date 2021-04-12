import React from 'react';
import ModelOptions, { ModelOptionsProps } from 'components/ModelOptions';
import SampleList, { SampleListProps } from 'components/SampleList';
import { Pane, Button, majorScale, SideSheet, Heading, TextInput } from 'evergreen-ui';
import { useBoolean } from 'lib/hooks';
import WorkspaceModels, { WorkspaceModelsProps } from 'components/WorkspaceModels';
import WorkspaceLabels, { WorkspaceLabelsProps } from 'components/WorkspaceLabels';
import { ETV } from 'lib/utils';
import Form from 'components/Form';
import { Link } from 'raviger';
import { Training } from 'lib/hooks/TrainingState';
import TrainingStateCounter, { isOngoingTraining } from 'components/ModelOptions/TrainingStateCounter';

export type WorkspacePageViewProps = {
    sampleProps: SampleListProps,
    modelsProps: WorkspaceModelsProps,
    labelsProps: WorkspaceLabelsProps,
    onRenameClick: () => void,
    onDeleteClick: () => void,
    modelCreateHref: string,
    workspaceRename: string,
    onWorkspaceRenameChange: (n: string) => void,
    training: Training
}

const Setting = ({ children, onSubmit }: { children: React.ReactNode, onSubmit: () => void }) =>
    <Pane is={Form} onSubmit={onSubmit} display="flex" justifyContent="space-between" alignItems="baseline">
        {children}
    </Pane>;

const WorkspacePageView = ({
    sampleProps, labelsProps, modelsProps, modelCreateHref,
    workspaceRename, onRenameClick, onDeleteClick, onWorkspaceRenameChange, training
}: WorkspacePageViewProps) => {
    return <Pane display="grid" gridTemplateColumns={`${majorScale(80)}px ${majorScale(80)}px`} justifyContent="space-evenly" gap={majorScale(4)} paddingBottom={majorScale(2)}>
        <Pane display="flex" gap={majorScale(4)} flexDirection="column">
            <Heading>Collected Samples</Heading>
            <Pane elevation={1}>
                <SampleList {...sampleProps} />
            </Pane>
        </Pane>
        <Pane display="flex" gap={majorScale(4)} flexDirection="column">
            <Heading>Workspace Models</Heading>
            <Pane display="grid" gridTemplateColumns="auto 150px" gap={majorScale(1)} elevation={1}>
                <Pane gridColumn="span 2">
                    <WorkspaceModels {...modelsProps} />
                </Pane>
                {isOngoingTraining(training) ? <Pane padding={majorScale(1)} paddingTop={0}>
                    <TrainingStateCounter training={training}/>
                </Pane> : null}
                <Button disabled={isOngoingTraining(training)} gridColumn="2" marginRight={majorScale(2)}
                    marginBottom={majorScale(1)} appearance="primary" is={Link} href={modelCreateHref}>Create new model</Button>
            </Pane>
            <Heading>Workspace Labels</Heading>
            <Pane elevation={1}>
                <WorkspaceLabels {...labelsProps} />
            </Pane>
            <Heading>Danger Zone</Heading>
            <Pane elevation={1} padding={majorScale(2)} display="flex" gap={majorScale(2)} flexDirection="column">
                <Setting onSubmit={onRenameClick}>
                    <Heading size={400}>Rename Workspace:</Heading>
                    <TextInput value={workspaceRename} onChange={(e: ETV<string>) => onWorkspaceRenameChange(e.target.value)}/>
                    <Button>Rename</Button>
                </Setting>
                <Setting onSubmit={onDeleteClick}>
                    <Heading size={400}>Delete Workspace</Heading>
                    <Button intent="danger">Delete</Button>
                </Setting>
            </Pane>
        </Pane>
    </Pane>;
};

export default WorkspacePageView;
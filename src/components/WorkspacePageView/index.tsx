import React from 'react';
import ModelOptions, { ModelOptionsProps } from 'components/ModelOptions';
import SampleList, { SampleListProps } from 'components/SampleList';
import { Pane, Button, majorScale, SideSheet, Heading, TextInput } from 'evergreen-ui';
import { useBoolean } from 'lib/hooks';
import WorkspaceModels, { WorkspaceModelsProps } from 'components/WorkspaceModels';
import WorkspaceLabels, { WorkspaceLabelsProps } from 'components/WorkspaceLabels';
import { ETV } from 'lib/utils';
import Form from 'components/Form';

export type WorkspacePageViewProps = {
    sampleProps: SampleListProps,
    modelOptionsProps: ModelOptionsProps,
    modelsProps: WorkspaceModelsProps,
    labelsProps: WorkspaceLabelsProps,
    onRenameClick: () => void,
    onDeleteClick: () => void,
    workspaceRename: string,
    onWorkspaceRenameChange: (n: string) => void,
}

const Setting = ({ children, onSubmit }: { children: React.ReactNode, onSubmit: () => void }) =>
    <Pane is={Form} onSubmit={onSubmit} display="flex" justifyContent="space-between">
        {children}
    </Pane>;

const WorkspacePageView = ({
    sampleProps, modelOptionsProps, labelsProps, modelsProps,
    workspaceRename, onRenameClick, onDeleteClick, onWorkspaceRenameChange
}: WorkspacePageViewProps) => {
    const [isShown, setShown, clearShown] = useBoolean();
    return <Pane display="grid" gridTemplateColumns={`${majorScale(80)}px ${majorScale(80)}px`} justifyContent="space-evenly" gap={majorScale(4)}>
        <SideSheet
            width={majorScale(40)}
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
            <Heading>Danger Zone</Heading>
            <Pane elevation={1} padding={majorScale(2)} display="flex" gap={majorScale(2)} flexDirection="column">
                <Setting onSubmit={onRenameClick}>
                    <Heading size={400}>Rename Workspace</Heading>
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
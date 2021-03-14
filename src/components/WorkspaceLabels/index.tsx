import { IconButton, Menu, MoreIcon, Popover, Table, Button, majorScale, Small } from 'evergreen-ui';
import { Promised, PromisePack } from 'lib/hooks/Promise';
import React from 'react';

export type Label = {
    name: string,
    count: number,
    id: string,
    desc: string,
    onNameChange: (n: string) => void | Promise<void>,
    onDescChange: (n: string) => void | Promise<void>,
};

export type WorkspaceLabelsProps = {
    labelsPH: PromisePack<Label[]>,
    createName: string,
    onCreateName: (s: string) => void | Promise<void>,
    onCreate: () => void | Promise<void>,
    onDeleteLabel: (id: string) => void | Promise<void>
}

const WorkspaceLabels = ({
    labelsPH, createName, onCreateName, onDeleteLabel, onCreate
}: WorkspaceLabelsProps) => <>
    <Table display="flex" flexDirection="column">
        <Table.Head>
            <Table.TextHeaderCell flex={0} flexBasis={majorScale(5)}>#</Table.TextHeaderCell>
            <Table.TextHeaderCell>Labels</Table.TextHeaderCell>
            <Table.TextHeaderCell>Description</Table.TextHeaderCell>
            <Table.TextHeaderCell flex={0} flexBasis={majorScale(10)}>Samples</Table.TextHeaderCell>
            <Table.HeaderCell flex={0} flexBasis={majorScale(7)}></Table.HeaderCell>
        </Table.Head>
        <Table.Body>
            <Promised promise={labelsPH} pending={'loading'}>{labels =>
                labels.length > 0 ? labels.map(({name, count, id, desc, onNameChange, onDescChange}, i) =>
                    <Table.Row key={name}>
                        <Table.TextCell flex={0} flexBasis={majorScale(5)}>{i}</Table.TextCell>
                        <Table.EditableCell cursor="text" onChange={onNameChange}>{name}</Table.EditableCell>
                        <Table.EditableCell cursor="text" onChange={onDescChange}>{desc}</Table.EditableCell>
                        <Table.TextCell flex={0} flexBasis={majorScale(10)}>{count}</Table.TextCell>
                        <Table.Cell flex={0} flexBasis={majorScale(7)}>
                            <Popover
                                content={
                                    <Menu>
                                        <Menu.Group>
                                            <Menu.Item intent="danger" onSelect={() => onDeleteLabel(id)}>Delete</Menu.Item>
                                        </Menu.Group>
                                    </Menu>
                                }
                            >
                                <IconButton icon={MoreIcon} appearance="minimal" />
                            </Popover>
                        </Table.Cell>
                    </Table.Row>
                ):
                    <Table.Row height={majorScale(12)} display="flex" justifyContent="center" alignItems="center">
                        <Small>No labels created yet, create one below</Small>
                    </Table.Row>}
            </Promised>
            <Table.Row borderBottom="none">
                <Table.TextCell flex={0} flexBasis={majorScale(8)}>Name: </Table.TextCell>
                <Table.EditableCell onChange={onCreateName}>{createName}</Table.EditableCell>
                <Table.Cell flex={0} flexBasis={majorScale(12)}><Button appearance="primary" onClick={onCreate}>Create</Button></Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>
</>;

export default WorkspaceLabels;
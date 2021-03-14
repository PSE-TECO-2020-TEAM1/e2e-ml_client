import { IconButton, majorScale, Menu, MoreIcon, Popover, Table, Button, BarcodeIcon, Tooltip } from 'evergreen-ui';
import { Promised, PromisePack } from 'lib/hooks/Promise';
import { Link } from 'raviger';
import React from 'react';

export type Model = {
    name: string,
    id: string,
    href: string,
    modelDetailsHref: string,
    // onNameChange: (n: string) => void | Promise<void>,
    onDelete: () => void | Promise<void>
};

export type WorkspaceModelsProps = {
    modelsPH: PromisePack<Model[]>,
}

const WorkspaceModels = ({
    modelsPH,
}: WorkspaceModelsProps) => <>
    {/* <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Models</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <Promised promise={modelsPH} pending={
                <tr>
                    <td>?</td>
                    <td>loading...</td>
                    <td></td>
                    <td></td>
                </tr>
            }>{m => m.map(({name, id, href, modelDetailsHref, onDelete}, i) =>
                    <tr key={name}>
                        <td>{i}</td>
                        <td><Link href={modelDetailsHref}>{name}</Link></td>
                        <td><button onClick={onDelete}>DEL</button></td>
                        <td><Link href={href}><button>QR</button></Link></td>
                    </tr>
                )}
            </Promised>
        </tbody>
    </table> */}
    <Table display="flex" flexDirection="column">
        <Table.Head>
            <Table.TextHeaderCell flex={0} flexBasis={majorScale(5)}>#</Table.TextHeaderCell>
            <Table.TextHeaderCell>Models</Table.TextHeaderCell>
            <Table.HeaderCell flex={0} flexBasis={majorScale(7)}></Table.HeaderCell>
        </Table.Head>
        <Table.Body>
            <Promised promise={modelsPH} pending="loading">{m => m.map(({name, id, href, modelDetailsHref, onDelete}, i) =>
                <Table.Row key={name}>
                    <Table.TextCell color="muted" flex={0} flexBasis={majorScale(5)}>{i}</Table.TextCell>
                    <Table.TextCell><Button width="100%" appearance="minimal" is={Link} href={modelDetailsHref}>{name}</Button></Table.TextCell>
                    <Table.Cell flex={0} flexBasis={majorScale(12)} display="flex" gap={majorScale(1)} justifyContent="flex-end">
                        <Tooltip content="QR code for identification">
                            <IconButton icon={BarcodeIcon} is={Link} href={href} appearance="minimal" />
                        </Tooltip>
                        <Popover
                            content={
                                <Menu>
                                    <Menu.Group>
                                        <Menu.Item intent="danger" onSelect={onDelete}>Delete</Menu.Item>
                                    </Menu.Group>
                                </Menu>
                            }
                        >
                            <IconButton icon={MoreIcon} appearance="minimal" />
                        </Popover>
                    </Table.Cell>
                    {/* <td><button onClick={onDelete}>DEL</button></td> */}
                    {/* <td><Link href={href}><button>QR</button></Link></td> */}
                </Table.Row>
            )}
            </Promised>
        </Table.Body>
    </Table>
</>;

export default WorkspaceModels;
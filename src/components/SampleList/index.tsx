import { Button, Heading, Table, Small, majorScale, Tooltip, IconButton, TrashIcon, Pane } from 'evergreen-ui';
import { Promised, PromisePack } from 'lib/hooks/Promise';
import { Link } from 'raviger';
import React, { useCallback } from 'react';

type DeleteButtonProps = {
    id: string,
    onSampleDelete: (id: string) => void | Promise<void>,
};

const DeleteButton = ({ id, onSampleDelete }: DeleteButtonProps) =>
    <Tooltip content="Delete Sample">
        <IconButton icon={TrashIcon} onClick={useCallback(() => onSampleDelete(id), [id, onSampleDelete])} appearance="minimal" />
    </Tooltip>;

export type SampleListProps = {
    collectDataHref: string,
    onSampleDelete: (id: string) => void | Promise<void>,
    samplesPH: PromisePack<{
        id: string,
        href: string
    }[]>
};

const SampleList = ({ collectDataHref, onSampleDelete, samplesPH }: SampleListProps) => <>
    <Table display="flex" flexDirection="column">
        <Table.Head height={majorScale(6)}>
            <Table.TextHeaderCell flex={0} flexBasis={majorScale(5)}>#</Table.TextHeaderCell>
            <Table.TextHeaderCell>Samples</Table.TextHeaderCell>
            <Table.TextHeaderCell flex={0} flexBasis={majorScale(16)} >
                <Button appearance="primary" is={Link} href={collectDataHref}>Collect Data</Button>
            </Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
            <Promised promise={samplesPH} pending={'loading'}>{samples =>
                samples.map(({ id, href }, i) => 
                    <Table.Row key={id} borderBottom={i + 1 === samples.length ? 'none' : 'muted'}>
                        <Table.TextHeaderCell flex={0} flexBasis={majorScale(5)}>{i}</Table.TextHeaderCell>
                        <Table.TextCell><Button width="100%" appearance="minimal" is={Link} href={href}>Sample {id}</Button></Table.TextCell>
                        <Table.Cell flex={0} flexBasis={majorScale(8)}>
                            <DeleteButton id={id} onSampleDelete={onSampleDelete}/>
                        </Table.Cell>
                    </Table.Row>
                )}
            </Promised>
        </Table.Body>
    </Table>
</>;

export default SampleList;
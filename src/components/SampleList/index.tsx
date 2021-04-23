import { Order } from 'containers/useSampleList';
import { Button, Heading, Table, Small, majorScale, Tooltip, IconButton, TrashIcon, Pane, Badge, Popover, Menu, TextDropdownButton, CaretDownIcon, ArrowUpIcon, ArrowDownIcon, BoxComponent, TableHeaderCellOwnProps, PolymorphicBoxProps } from 'evergreen-ui';
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
        href: string,
        label: string,
        color: string
    }[]>,
    setOrder: (o: Order) => void,
    order: Order
};

const getIconForOrder = (order: Order) => {
    switch (order) {
    case Order.ASC:
        return ArrowUpIcon;
    case Order.DESC:
        return ArrowDownIcon;
    default:
        return CaretDownIcon;
    }
};

interface SortedHeaderCellProps extends PolymorphicBoxProps<'div', TableHeaderCellOwnProps> {
    order: Order, setOrder: (o: Order) => void, children: React.ReactNode
}
const SortedHeaderCell = ({ order, setOrder, children, ...rest }: SortedHeaderCellProps) => <Table.HeaderCell {...rest}>
    <Popover
        content={({ close }) => (
            <Menu>
                <Menu.OptionsGroup
                    title="Order"
                    options={[
                        { label: 'Ascending', value: Order.ASC },
                        { label: 'Descending', value: Order.DESC },
                        { label: 'Default', value: Order.ORIG }
                    ]}
                    selected={order}
                    onChange={value => {
                        setOrder(value);
                        close();
                    }}
                />
            </Menu>
        )}>
        <TextDropdownButton
            icon={getIconForOrder(order)}
        >{children}</TextDropdownButton>
    </Popover>
</Table.HeaderCell>;

const SampleList = ({ collectDataHref, onSampleDelete, samplesPH, order, setOrder }: SampleListProps) => <>
    <Table display="flex" flexDirection="column">
        <Table.Head height={majorScale(6)}>
            <Table.TextHeaderCell flex={0} flexBasis={majorScale(5)}>#</Table.TextHeaderCell>
            <Table.TextHeaderCell>Samples</Table.TextHeaderCell>
            <SortedHeaderCell flex={0} flexBasis={majorScale(18)}
                order={order}
                setOrder={setOrder}
            >Label</SortedHeaderCell>
            <Table.TextHeaderCell flex={0} flexBasis={majorScale(16)} >
                <Button appearance="primary" is={Link} href={collectDataHref}>Collect Data</Button>
            </Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
            <Promised promise={samplesPH} pending={'loading'}>{samples =>
                samples.map(({ id, href, label, color }, i) => 
                    <Table.Row key={id} borderBottom={i + 1 === samples.length ? 'none' : 'muted'}>
                        <Table.TextHeaderCell flex={0} flexBasis={majorScale(5)}>{i + 1}</Table.TextHeaderCell>
                        <Table.TextCell><Button width="100%" appearance="minimal" is={Link} href={href}>Sample {id}</Button></Table.TextCell>
                        <Table.TextCell flex={0} flexBasis={majorScale(18 + 8)}><Badge color="neutral" isSolid backgroundColor={color}>{label}</Badge></Table.TextCell>
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
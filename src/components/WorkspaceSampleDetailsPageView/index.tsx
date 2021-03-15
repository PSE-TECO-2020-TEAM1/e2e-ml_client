import Graph from 'components/Graph';
import { Combobox, Badge, Pane, Text, Small, Heading, majorScale, Table, Tooltip, IconButton, TrashIcon, Button } from 'evergreen-ui';
import { Promised, PromisePack } from 'lib/hooks/Promise';
import { formatDate, UnixTimestamp } from 'lib/utils';
import React, { useCallback } from 'react';

export type WorkspaceSampleDetailsPageViewProps = {
    labelsPH: PromisePack<{ id: string, name: string }[]>,
    samplePH: PromisePack<{
        label: string,
        start: UnixTimestamp,
        end: UnixTimestamp,
        points: { name: string; data: [number, number][]; }[],
        ranges: {
            from: UnixTimestamp,
            to: UnixTimestamp,
            color: string,
            del: () => void
        }[],
    }>,
    onGraphClick: (pos: UnixTimestamp) => void,
    onLabel: (label: string) => void | Promise<void>,
    timeframeAction: () => void,
    timeframeActionName: string,
}

const WorkspaceSampleDetailsPageView = ({ labelsPH, samplePH, onLabel, onGraphClick, timeframeAction, timeframeActionName }: WorkspaceSampleDetailsPageViewProps) => {
    const onLabelEvent = useCallback(e => onLabel(e.target.value), [onLabel]);
    return <Pane>
        <Pane display="flex" gap={majorScale(2)} justifyContent="space-evenly">
            <Pane display="flex" gap={majorScale(2)} alignItems="baseline">
                <Heading>Label: </Heading>
                <Promised
                    promise={samplePH}
                    pending={'loading label...'}
                >{({ label }) =>
                        <Promised
                            key={label}
                            promise={labelsPH}
                            pending={null}
                        >{labels =>
                                <Combobox
                                    items={labels.map(v => v.name)}
                                    onChange={onLabel}
                                    selectedItem={label}
                                    placeholder="Label"
                                />
                            }</Promised>
                    }</Promised>
            </Pane>
            <Promised
                promise={samplePH}
                pending={'loading metadata...'}
            >{({ start, end }) =>
                    <Pane display="flex" gap={majorScale(2)} alignContent="center">
                        <Heading display="inline">Start: </Heading><Text>{formatDate(start)}</Text>
                        <Heading display="inline">End: </Heading><Text>{formatDate(end)}</Text>
                    </Pane>}
            </Promised>
        </Pane>
        <Promised
            promise={samplePH}
            pending={'loading sample graph...'}
        >{({ points, ranges }) =>
                <div>
                    <Graph data={points} ranges={ranges} animation onClick={onGraphClick} />
                </div>}
        </Promised>
        <Promised
            promise={samplePH}
            pending={'loading sample graph...'}
        >{({ ranges }) =>
                <Pane display="flex" flexDirection="column" alignItems="center">
                    <Pane minWidth={majorScale(120)} display="flex" flexDirection="column" gap={majorScale(2)}>
                        <Pane display="flex">
                            <Heading display="inline">Timeframes:</Heading>
                            <Button marginRight={majorScale(2)} marginLeft="auto" onClick={timeframeAction}>{timeframeActionName}</Button>
                        </Pane>
                        <Table elevation={1}>
                            <Table.Head>
                                <Table.TextHeaderCell flex={0} flexBasis={majorScale(12)}>Color</Table.TextHeaderCell>
                                <Table.TextHeaderCell>Start</Table.TextHeaderCell>
                                <Table.TextHeaderCell>End</Table.TextHeaderCell>
                                <Table.HeaderCell flex={0} flexBasis={majorScale(8)}></Table.HeaderCell>
                            </Table.Head>
                            <Table.Body>
                                {ranges.length !== 0 ? ranges.map(({ from, to, color, del }) =>
                                    <Table.Row>
                                        <Table.TextCell flex={0} flexBasis={majorScale(12)}><Badge color="neutral" isSolid backgroundColor={color}>{color}</Badge></Table.TextCell>
                                        <Table.TextCell>{formatDate(from)}</Table.TextCell>
                                        <Table.TextCell>{formatDate(to)}</Table.TextCell>
                                        <Table.Cell flex={0} flexBasis={majorScale(8)}>
                                            <Tooltip
                                                content="delete timeframe"
                                            >
                                                <IconButton icon={TrashIcon} onClick={del} />
                                            </Tooltip>
                                        </Table.Cell>
                                    </Table.Row>
                                // <span key={from + color} style={ { background: color } }>Start: {from}, End: ${to}<button onClick={del}>DEL</button></span>
                                ):
                                    <Table.Row height={majorScale(12)} display="flex" justifyContent="center" alignItems="center">
                                        <Small>No timeframes created yet, add one above</Small>
                                    </Table.Row>
                                }
                            </Table.Body>
                        </Table>
                    </Pane>
                </Pane>}
        </Promised>
    </Pane>;
};

export default WorkspaceSampleDetailsPageView;
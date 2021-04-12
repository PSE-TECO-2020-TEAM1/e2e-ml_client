import Graph from 'components/Graph';
import { Pane, majorScale, Heading, Text, Button, Table, Strong } from 'evergreen-ui';
import { Promised, PromisePack } from 'lib/hooks/Promise';
import { SensorName } from 'lib/sensors';
import { UnixTimestamp } from 'lib/utils';
import React from 'react';

type DataRecord = Record<SensorName, {
    timestamp: UnixTimestamp,
    data: number[]
}[]>;

type DataFormat = Record<SensorName, readonly string[]>;

type TableType = {
    label: string;
    timeframe: number[];
}[];

const tableTime = (num: number) => (Math.round(num * 100) / 100) / 1000 + 's';

const renderGraph = (data: DataRecord, format: DataFormat) => {
    const d: {name: string, data: [number, number][]}[] = [];

    for (const [k, v] of Object.entries(data)) {
        for (let index = 0; index < format[k as SensorName].length; index++) {
            const element = format[k as SensorName][index];
            d.push({ name: element, data: v.map(ns => ([ns.timestamp, ns.data[index]])) });
        }
    }

    return <Graph data={d} />;
};

const renderTable = (table: TableType) => {
    
    return <Table>
        {/* <Table.Head>
            <Table.TextHeaderCell>
            </Table.TextHeaderCell>
            <Table.TextHeaderCell>
            </Table.TextHeaderCell>
        </Table.Head> */}
        <Table.Body height={240}>
            {table.map(row => (
                <Table.Row key={row.timeframe[0] + '-' + row.timeframe[1] + '-' + row.label}>
                    <Table.TextCell>{tableTime(row.timeframe[0])} - {tableTime(row.timeframe[1])}</Table.TextCell>
                    <Table.TextCell>{row.label}</Table.TextCell>
                </Table.Row>
            ))}
        </Table.Body>
    </Table>;
};

export type PredictionPageViewProps = {
    isDone: boolean,
    data: DataRecord,
    realtime: string,
    format: DataFormat,
    sensorsPH: PromisePack<{
        name: string,
        rate: number
    }[]>,
    onRestart: () => void,
    onStop: () => void,
    table: TableType
}

const PredictionPageView = ({ isDone, data, realtime, format, sensorsPH, onRestart, onStop, table }: PredictionPageViewProps) => {
    return <Pane gap={majorScale(2)} display="grid" gridTemplateColumns={'0 minmax(0, 1fr) minmax(0, 1fr) 0'}>
        <Heading gridColumn="2 / span 2">{isDone ? 'Identification complete' : 'Identifying actions'}</Heading>
        <Text gridColumn="2 / span 2">Realtime prediction: <Strong>{realtime}</Strong></Text>
        {isDone
            ? <Pane gridColumn="2 / span 2">
                {renderTable(table)}
            </Pane>
            : <Pane gridColumn="1 / span 4">
                {renderGraph(data, format)}
            </Pane>
        }
        <Heading gridColumn="2 / span 2" >Selected Sensors and Sampling Rates:</Heading>
        <Promised promise={sensorsPH} pending={'loading...'}>{sensors =>
            sensors.map(({ name, rate }, i) => <Text gridColumn={(i % 2) + 2} key={name} >{name} ({rate} Hz)</Text>)
        }</Promised>
        <Button appearance="primary" gridColumn="2 / span 2" onClick={isDone ? onRestart : onStop}>{!isDone ? 'Stop Classifying' : 'Restart Classifying'}</Button>
    </Pane>;
};

export default PredictionPageView;
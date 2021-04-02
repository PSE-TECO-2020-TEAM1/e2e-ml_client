import Graph from 'components/Graph';
import { Button, Heading, Label, majorScale, Pane, Small, Text } from 'evergreen-ui';
import { Promised, PromisePack } from 'lib/hooks/Promise';
import { SensorName } from 'lib/sensors';
import { UnixTimestamp } from 'lib/utils';
import { Link } from 'raviger';
import React from 'react';

type DataRecord = Record<SensorName, {
    timestamp: UnixTimestamp,
    data: number[]
}[]>;

type DataFormat = Record<SensorName, readonly string[]>;

export type RecordingPageViewProps = {
    data: DataRecord,
    format: DataFormat,
    label: string,
    sensorsPH: PromisePack<{
        name: string,
        rate: number
    }[]>,
    countdown: number,
    remaining: number,
    isRecording: boolean,
    isPre: boolean,
    canSend: boolean,
    onSend: () => void,
    onRestart: () => void,
    reconfigureLink: string,
} 

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

const RecordingPageView = ({ data, format, label, sensorsPH, countdown, remaining, isRecording, isPre, onSend, canSend, reconfigureLink, onRestart }: RecordingPageViewProps) => {
    return <Pane gap={majorScale(2)} display="grid" gridTemplateColumns={'0 minmax(0, 1fr) minmax(0, 1fr) 0'}>
        <Heading gridColumn="2 / span 2">{isPre ? 'Prepare to Record Data' : isRecording ? 'Recording Data' : 'Recording Done'}</Heading>
        <Text gridColumn="2">Label: {label}</Text>
        <Text gridColumn="3">{isPre ? countdown : remaining} seconds remaining</Text>
        {isPre ? null : 
            <Pane gridColumn="1 / span 4">
                {renderGraph(data, format)}
            </Pane>
        }
        <Heading gridColumn="2 / span 2" >Selected Sensors and Sampling Rates:</Heading>
        <Promised promise={sensorsPH} pending={'loading...'}>{sensors =>
            sensors.map(({ name, rate }, i) => <Text gridColumn={(i % 2) + 2} key={name} >{name} ({rate} Hz)</Text>)
        }</Promised>
        {!isPre ? <>
            <Button appearance="primary" disabled={!(canSend && !isRecording)} gridColumn="2 / span 2" onClick={onSend}>Send Sample</Button>
            <Heading size={400} gridColumn="2 / span 2">Restart:</Heading>
            <Button gridColumn="2" onClick={onRestart}>same configuration</Button>
            <Button gridColumn="3" is={Link} href={reconfigureLink}>new configuration</Button>
        </> : null}
    </Pane>;
};

export default RecordingPageView;
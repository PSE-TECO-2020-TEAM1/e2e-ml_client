import Graph from 'components/Graph';
import { Promised, PromisePack } from 'lib/hooks/Promise';
import { SensorName } from 'lib/sensors';
import { UnixTimestamp } from 'lib/utils';
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
    onSend: () => void
} 

const RecordingPageView = ({ data, format, label, sensorsPH, countdown, remaining, isRecording, isPre, onSend, canSend }: RecordingPageViewProps) => {
    let content;

    if (isPre) content = <>
        <span>{countdown}</span>
        <span>seconds</span>
    </>;
    else {
        const d: {name: string, data: [number, number][]}[] = [];

        for (const [k, v] of Object.entries(data)) {
            for (let index = 0; index < format[k as SensorName].length; index++) {
                const element = format[k as SensorName][index];
                d.push({ name: element, data: v.map(ns => ([ns.timestamp, ns.data[index]])) });
            }
        }

        content = <>
            <span>{remaining}</span>
            <span>seconds remaining</span>
            <Graph data={d} />
        </>;
    }

    return <>
        <header>{isPre ? 'Prepare to Record Data' : 'Recording Data'}</header>
        <b>{label}</b>
        {content}
        <em>Selected Sensors and Sampling Rates:</em>
        <Promised promise={sensorsPH} pending={'loading...'}>{sensors =>
            sensors.map(({ name, rate }) => <span key={name} >{name} ({rate} Hz)</span>)
        }</Promised>
        {(!isRecording && !isPre) ? <>
            {canSend ? <button onClick={onSend}>send</button> : null}
            <span>to restart refresh page</span>
        </> : null}
    </>;
};

export default RecordingPageView;
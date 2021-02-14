import { timeStamp } from 'console';
import { Promised, PromisePack } from 'lib/hooks/Promise';
import { SensorName } from 'lib/sensors';
import { UnixTimestamp } from 'lib/utils';
import React from 'react';

type DataRecord = Record<SensorName, {
    timestamp: UnixTimestamp,
    data: number[]
}[]>;

export type RecordingPageViewProps = {
    data: DataRecord,
    label: string,
    sensorsPH: PromisePack<{
        name: string,
        rate: number
    }[]>,
    countdown: number,
    remaining: number,
    isRecording: boolean,
} 

const RecordingPageView = ({ data, label, sensorsPH, countdown, remaining, isRecording }: RecordingPageViewProps) => {
    let content;

    if (!isRecording) content = <>
        <span>{countdown}</span>
        <span>seconds</span>
    </>;
    // TODO implement
    else content = <>
        Gyroscope
        <ul>
            {data['Gyroscope'].map(({ timestamp, data }) => <li key={timestamp} >{timestamp}: {data.join(', ')}</li>)}
        </ul>
    </>;

    return <>
        <header>{!isRecording ? 'Prepare to Record Data' : 'Recording Data'}</header>
        <b>{label}</b>
        {content}
        <em>Selected Sensors and Sampling Rates:</em>
        <Promised promise={sensorsPH} pending={'loading...'}>{sensors =>
            sensors.map(({ name, rate }) => <span key={name} >{name} ({rate} Hz)</span>)
        }</Promised>
    </>;
};

export default RecordingPageView;
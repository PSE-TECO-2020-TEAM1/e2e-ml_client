import { timeStamp } from 'console';
import { Promised, PromisePack } from 'lib/hooks/Promise';
import { SensorName } from 'lib/sensors';
import { UnixTimestamp } from 'lib/utils';
import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

type DataRecord = Record<SensorName, {
    timestamp: UnixTimestamp,
    data: number[]
}[]>;

type DataFormat = Record<SensorName, string[]>;

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
} 

const RecordingPageView = ({ data, format, label, sensorsPH, countdown, remaining, isRecording, isPre }: RecordingPageViewProps) => {
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

        console.log(data, format, d);

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
    </>;
};

type GraphProps = {
    data: {name: string, data: [number, number][]}[],
}

const Graph = ({ data }: GraphProps) => {
    const options = {
        chart: { type: 'line', animation: false },
        xAxis: { type: 'datetime'// , range: 10 * 1000
        },
        plotOptions: {
            series: {
                animation: false,
                label: {
                    enabled: true
                }
            }
        },
        rangeSelector: { enabled: false },
        credits: { enabled: false },
        scrollbar: { enabled: false },
        navigator: { enabled: false },
        legend: { enabled: true },
        series: data,
    };

    return <HighchartsReact constructorType={'stockChart'} options={options} highcharts={Highcharts} />;
};

export default RecordingPageView;
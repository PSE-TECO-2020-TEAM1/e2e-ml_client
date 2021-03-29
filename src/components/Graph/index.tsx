import React, { useCallback, useRef } from 'react';
import Highcharts, { Chart } from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { UnixTimestamp } from 'lib/utils';
import assert from 'lib/assert';
import { useOnClick } from 'lib/hooks/Mouse';

type GraphProps = {
    data: {name: string, data: [number, number][]}[],
    animation?: boolean,
    ranges?: {
        from: UnixTimestamp,
        to: UnixTimestamp,
        color: string
    }[],
    onClick?: (pos: UnixTimestamp) => void
}

const Graph = ({ data, animation = false, ranges = [], onClick }: GraphProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const chart = useRef<Chart>();

    const plotBands = ranges.map(({ from, to, color }, i) => {
        return {
            color,
            from,
            to,
        };
    });

    useOnClick(containerRef, (e: MouseEvent) => {
        if (typeof onClick === 'undefined') return;
        assert(typeof chart.current !== 'undefined');
        const re = chart.current.pointer.normalize(e);
        const x = chart.current?.xAxis[0].toValue(re.chartX);
        onClick(x);
    });

    const options = {
        chart: { type: 'line', animation: animation },
        xAxis: {
            plotBands,
            type: 'datetime'// , range: 10 * 1000
        },
        plotOptions: {
            series: {
                animation: animation,
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
        series: data.filter(({ data }) => data.length > 0),
    };

    return <div ref={containerRef}>
        <HighchartsReact constructorType={'stockChart'} options={options} highcharts={Highcharts} callback={useCallback((ch: Chart) => chart.current = ch, [])} />
    </div>;
};

export default Graph;
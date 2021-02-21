import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import Highcharts, { Chart } from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { UnixTimestamp } from 'lib/utils';
import { useMouse, useMouseMove } from 'lib/hooks/Mouse';

type GraphProps = {
    data: {name: string, data: [number, number][]}[],
    animation?: boolean,
    editable?: boolean,
    ranges?: {
        from: UnixTimestamp,
        to: UnixTimestamp,
    }[],
    onRangeDrag?: (range: number, newStart: number, newEnd: number) => void
    onRangeRightResize?: (range: number, newEnd: number) => void
    onRangeLeftResize?: (range: number, newStart: number) => void
    onNewRange?: (range: number, newStart: number, newEnd: number) => void
}

const Graph = ({ data, animation = false, editable = false, ranges = [] }: GraphProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const chart = useRef<Chart>();
    const { isDown, isEntered } = useMouse(containerRef);
    const position = useMouseMove(containerRef);
    const [ rangeOver, dispatch ] = useReducer((state: boolean[], [i, hover]: [i: number, hover: boolean]) => {
        const n = [...state];
        n[i] = hover;
        return n;
    }, ranges.map(() => false)); 

    const plotBands = ranges.map(({ from, to }, i) => {
        return {
            color: '#FCFFC5',
            from,
            to,
            events: {
                mouseover: () => dispatch([i, true]),
                mouseout: () => dispatch([i, false]),
            }
        };
    });

    const start = useRef<number | boolean>(false);
    useEffect(() => {
        if (!editable) return; 
        if(!(position.current !== null && typeof chart.current !== 'undefined')) return;
        const e = chart.current.pointer.normalize(position.current);
        const x = chart.current?.xAxis[0].toValue(e.chartX);
        console.log(isEntered, isDown, rangeOver, x, start.current);

        // drag start
        if (isEntered && isDown) {
            start.current = x;
            return;
        } else if (start.current !== false) {
            if (isEntered && !isDown) {
                console.log('area', start.current, x);
            }
            start.current = false;
            return;
        } else {
            start.current = false;
        }

    }, [editable, isDown, isEntered, position, rangeOver]);

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
        <HighchartsReact constructorType={'stockChart'} options={options} highcharts={Highcharts} callback={useCallback((ch: Chart) => chart.current = ch, [])} />;
    </div>;
};

export default Graph;
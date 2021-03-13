import Graph from 'components/Graph';
import Wrapper from 'components/Wrapper';
import { Promised, PromisePack } from 'lib/hooks/Promise';
import { UnixTimestamp } from 'lib/utils';
import React, { useCallback } from 'react';
import styles from './index.module.scss';
const { main, graph, metadata } = styles;

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
    return <Wrapper className={main}>
        <Promised
            promise={samplePH}
            pending={'loading label...'}
        >{({ label }) =>
                <select value={label} onChange={onLabelEvent}>
                    <Promised
                        promise={labelsPH}
                        pending={null}
                    >{labels => labels.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}</Promised>
                </select>}
        </Promised>
        <Promised
            promise={samplePH}
            pending={'loading metadata...'}
        >{({ start, end }) =>
                <div className={metadata}>
                    <span><em>Start: </em>{(new Date(start)).toLocaleString()}</span>
                    <span><em>End: </em>{(new Date(end)).toLocaleString()}</span>
                </div>}
        </Promised>
        <Promised
            promise={samplePH}
            pending={'loading sample graph...'}
        >{({ points, ranges }) =>
                <div className={graph}>
                    <Graph data={points} ranges={ranges} animation onClick={onGraphClick} />
                </div>}
        </Promised>
        <Promised
            promise={samplePH}
            pending={'loading sample graph...'}
        >{({ ranges }) =>
                <div>
                    <em>Timeframes: </em>
                    <nav>
                        {ranges.map(({ from, to, color, del }) => <span key={from + color} style={ { background: color } }>Start: {from}, End: ${to}<button onClick={del}>DEL</button></span>)}
                    </nav>
                    <button onClick={timeframeAction}>{timeframeActionName}</button>
                </div>}
        </Promised>
    </Wrapper>;
};

export default WorkspaceSampleDetailsPageView;
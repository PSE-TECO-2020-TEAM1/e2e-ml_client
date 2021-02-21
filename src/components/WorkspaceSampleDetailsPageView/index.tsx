import Graph from 'components/Graph';
import { Promised, PromisePack } from 'lib/hooks/Promise';
import { UnixTimestamp } from 'lib/utils';
import React, { useCallback } from 'react';

export type WorkspaceSampleDetailsPageViewProps = {
    labelsPH: PromisePack<{ id: string, name: string }[]>,
    samplePH: PromisePack<{
        label: string,
        start: UnixTimestamp,
        end: UnixTimestamp,
        points: { name: string; data: [number, number][]; }[]
    }>,
    onLabel: (label: string) => void | Promise<void>,
}

const WorkspaceSampleDetailsPageView = ({ labelsPH, samplePH, onLabel }: WorkspaceSampleDetailsPageViewProps) => {
    const onLabelEvent = useCallback(e => onLabel(e.target.value), [onLabel]);
    return <>
        <Promised
            promise={samplePH}
            pending={'loading label...'}
        >{({ label }) =>
                <select value={label} onChange={onLabelEvent}>
                    <Promised
                        promise={labelsPH}
                        pending={null}
                    >{labels => labels.map(({ id, name }) => <option value={id}>{name}</option>)}</Promised>
                </select>}
        </Promised>
        <Promised
            promise={samplePH}
            pending={'loading metadata...'}
        >{({ start, end }) =>
                <>
                    <span><em>Start: </em>{(new Date(start)).toLocaleString()}</span>
                    <span><em>End: </em>{(new Date(end)).toLocaleString()}</span>
                </>}
        </Promised>
        <Promised
            promise={samplePH}
            pending={'loading sample graph...'}
        >{({ points }) =>
                <>
                    <Graph data={points} animation editable />
                </>}
        </Promised>
    </>;
};

export default WorkspaceSampleDetailsPageView;
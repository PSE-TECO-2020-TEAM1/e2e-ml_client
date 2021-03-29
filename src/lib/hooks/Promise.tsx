import assert from 'lib/assert';
import { log } from 'lib/utils';
import React, { Fragment, useEffect, useState } from 'react';

export enum State {
    Pending,
    Resolved,
    Rejected
}

export type PromisePack<T> = [State, T | undefined, any];

export const mapPack = <T,Y>([state, content, error]: PromisePack<T>, fn: (v: T) => Y): PromisePack<Y> => {
    let mapped = undefined;
    if (state === State.Resolved) {
        assert(typeof content !== 'undefined');
        mapped = fn(content);
    };
    return [state, mapped, error];
};

const usePromise = <T,>(promise: Promise<T> | (() => Promise<T>), inputs: any[]): PromisePack<T> => {
    const [state, setState] = useState<PromisePack<T>>([State.Pending, undefined, undefined]);

    useEffect(() => {
        let cancelled = false;
        const p = typeof promise === 'function' ? promise() : promise;
        p.then(d => {
            if (cancelled) return;
            setState([State.Resolved, d, undefined]);
        }).catch(e => {
            if (cancelled) return;
            setState([State.Rejected, undefined, e]);
        });

        return () => {
            cancelled = true;
        };
    // intended charge behaviour
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, inputs);

    return state;
};

export default usePromise;

export type PromisedProps<T,> = {
    pending?: React.ReactNode,
    rejected?: React.ReactNode,

    promise: PromisePack<T>,
    children: (promiseResult: T) => React.ReactNode
}

export const Promised = <T,>({ promise: [state, data, error], pending = <Fragment />, rejected, children } : PromisedProps<T>): React.ReactElement | null => {
    if (state === State.Pending) return <Fragment>{ pending }</Fragment>;
    if (state === State.Rejected) {
        log.error('Mitigated with rejected component', error);
        return <Fragment>{ rejected || pending }</Fragment>;
    }
    assert(state === State.Resolved, 'promise is not resolved');
    assert(typeof data !== 'undefined', 'data is undefined');

    return <Fragment>{ children(data) }</Fragment>;
};
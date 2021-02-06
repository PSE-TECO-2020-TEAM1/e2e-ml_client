import assert from 'lib/assert';
import React, { Fragment, useEffect, useState } from 'react';

export enum State {
    Pending,
    Resolved,
    Rejected
}

const usePromise = <T,>(promise: Promise<T> | (() => Promise<T>)): [State, T | undefined, any] => {
    const [state, setState] = useState<[State, T | undefined, any]>([State.Pending, undefined, undefined]);

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
    }, [promise]);

    return state;
};

export default usePromise;

export interface PromisedProps<T,> {
    pending?: React.ReactNode,
    rejected?: React.ReactNode,

    promise: [State, T | undefined, any],
    children: (promiseResult: T) => React.ReactNode
}

export const Promised = <T,>({ promise: [state, data, error], pending = <Fragment />, rejected, children } : PromisedProps<T>): React.ReactElement | null => {
    if (state === State.Pending) return <Fragment>{ pending }</Fragment>;
    if (state === State.Rejected) return <Fragment>{ rejected || pending }</Fragment>;
    assert(state === State.Resolved, 'promise is not resolved');
    assert(typeof data !== 'undefined', 'data is undefined');

    return <Fragment>{ children(data) }</Fragment>;
};
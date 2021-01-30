import { useEffect, useState } from 'react';

export enum State {
    Pending,
    Resolved,
    Rejected
}

const usePromise = <T,>(promise: Promise<T>): [State, T | null, any] => {
    const [state, setState] = useState(State.Pending);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        let cancelled = false;
        promise.then(d => {
            if (cancelled) return;
            setState(State.Resolved);
            setData(d);
        }).catch(e => {
            if (cancelled) return;
            setState(State.Rejected);
            setError(e);
        });

        return () => {
            cancelled = true;
        };
    }, [promise]);

    return [state, data, error];
};

export default usePromise;
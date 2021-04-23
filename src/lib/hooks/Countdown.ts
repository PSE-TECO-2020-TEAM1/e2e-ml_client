import { useCallback, useEffect, useRef, useState } from 'react';
const { setInterval, clearInterval } = window;

const useCounter = (from: number = 1000, refresh: number = 100): [remaining: number, begin: () => void] => {
    const init = useRef(0);
    const interval = useRef<number>();

    const [value, setValue] = useState<number>(from);

    const tick = useCallback(() => {
        const current = Date.now();
        setValue(v => from - (current - init.current));
    }, [from, value]);
    
    const start = useCallback(() => {
        clearInterval(interval.current);
        init.current = Date.now();
        interval.current = setInterval(tick, refresh);
    }, [tick, refresh]);

    // cleanup after end
    useEffect(() => {
        if (value <= 0) clearInterval(interval.current);
    }, [value]);

    // cleanup after unmount
    useEffect(() => {
        return () => clearInterval(interval.current);
    }, []);

    return [value <= 0 ? 0 : value, start];
};
  
export default useCounter;

// import assert from 'lib/assert';
// import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
// const { setInterval, clearInterval } = window;

// type Action = [number, number] | number;
// type State = { interval: number, value: number, init: number };

// const reducer = (s: State, a: Action) => {
//     if (Array.isArray(a)) {
//         assert(a.length === 2);
//         return { ...s, init: a[0], interval: a[1] };
//     }

//     return { ...s, value: a };
// };

// const useCounter = (from: number = 1000, refresh: number = 100): [remaining: number, begin: () => void] => {
//     const [{ interval, value, init }, dispatch] = useReducer(reducer, { interval: 0, value: from, init: 0 });

//     const tick = useCallback(() => {
//         console.log('tick', value);
//         const current = Date.now();
//         dispatch(from - (current - init));
//         if (value <= 0) clearInterval(interval);
//     }, [init, interval, from, value]);
    
//     const start = useCallback(() => {
//         clearInterval(interval);
//         dispatch([Date.now(), setInterval(tick, refresh)]);
//     }, [tick, refresh, interval]);

//     useEffect(() => () => clearInterval(interval), [interval]);

//     return [value <= 0 ? 0 : value, start];
// };
  
// export default useCounter;
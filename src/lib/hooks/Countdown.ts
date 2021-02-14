import { useCallback, useRef, useState } from 'react';
const { setInterval, clearInterval } = window;

const useCounter = (from: number = 1000, refresh: number = 100): [remaining: number, begin: () => void] => {
    const init = useRef(Date.now());
    const interval = useRef<number>();

    const [value, setValue] = useState<number>(from);

    const tick = useCallback(() => {
        const current = Date.now();
        setValue(v => v - (current - init.current));
        if (value <= 0) clearInterval(interval.current);
    }, [value]);
    
    const start = useCallback(() => {
        clearInterval(interval.current);
        interval.current = setInterval(tick, refresh);
    }, [tick, refresh]);

    return [value <= 0 ? 0 : value, start];
};
  
export default useCounter;
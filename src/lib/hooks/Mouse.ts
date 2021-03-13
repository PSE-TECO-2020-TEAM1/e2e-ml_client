import { useCallback, useLayoutEffect, useRef } from 'react';

export const useOnClick = <T extends HTMLElement>(target: React.RefObject<T>, f: (e: MouseEvent) => void) => {
    useLayoutEffect(() => {
        const elem = target.current;

        elem?.addEventListener('click', f);

        return () => {
            elem?.removeEventListener('click', f);
        };
    }, [f, target]);
};

export const useMouseMove = <T extends HTMLElement>(containerRef: React.RefObject<T>) => {
    const position = useRef<MouseEvent | null>(null);
    const handler = useCallback(e => position.current = e, []);
    useLayoutEffect(() => {
        const elem = containerRef.current;
        elem?.addEventListener('mousemove', handler);

        return () => {
            elem?.removeEventListener('mousemove', handler);
        };
    }, [containerRef, handler]);

    return position;
};
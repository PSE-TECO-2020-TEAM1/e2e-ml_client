import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import useBoolean from './Boolean';

export const useMouse = <T extends HTMLElement>(target: React.RefObject<T>) => {
    const [isDown, setDown, clearDown] = useBoolean(false);
    const [isEntered, setEnter, clearEnter] = useBoolean(false);

    useLayoutEffect(() => {
        const elem = target.current;

        elem?.addEventListener('mousedown', setDown);
        elem?.addEventListener('mouseup', clearDown);
        elem?.addEventListener('mouseenter', setEnter);
        elem?.addEventListener('mouseleave', clearEnter);

        return () => {
            elem?.removeEventListener('mousedown', setDown);
            elem?.removeEventListener('mouseup', clearDown);
            elem?.removeEventListener('mouseenter', setEnter);
            elem?.removeEventListener('mouseleave', clearEnter);
        };
    }, [clearDown, clearEnter, setDown, setEnter, target]);

    return { isDown, isEntered };
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
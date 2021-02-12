import assert from 'lib/assert';
import React, { useCallback, useRef } from 'react';
import ContentEditable from 'react-contenteditable';
import styles from './index.module.scss';

const { active, button, container } = styles;

export type CovertTextButtonInputProps = {
    value: string,
    onChange: (s: string) => void,
    buttonRender?: React.ReactNode,
}

const CovertTextButtonInput = ({ value: initial, onChange, buttonRender = 'SND' }: CovertTextButtonInputProps) => {
    const text = useRef(initial);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const setTextTo = useCallback((str: string) => {
        text.current = str;
        // following makes my heart boil but react-contenteditable is kind of an hack cobbled together with hopes, prayers and DOM refs
        assert(buttonRef.current !== null);
        if (str !== initial) buttonRef.current.classList.add(active);
        else buttonRef.current.classList.remove(active);
    }, [initial]);

    const onSend = useCallback(() => {
        const tmp = text.current;
        setTextTo(initial);
        onChange(tmp);
    }, [initial, setTextTo, onChange]);

    return <div className={container}>
        <ContentEditable
            html={text.current}
            onChange={useCallback(e => setTextTo(e.target.value), [setTextTo])}
            // onBlur={useCallback(() => {console.log('ypp');setTextTo(initial);}, [setTextTo, initial])} // does not work
        />
        <button ref={buttonRef} className={`${button}`} onClick={onSend}>{buttonRender}</button>
    </div>;
};

export default CovertTextButtonInput;
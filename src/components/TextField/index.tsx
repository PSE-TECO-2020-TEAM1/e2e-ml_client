import React, { HTMLProps, useCallback } from 'react';
export interface TextFieldProps extends HTMLProps<HTMLInputElement> {
    onType?(str: string): void,
    error?: boolean
    label?: string,
}

const TextField: (props: TextFieldProps) => React.ReactElement = ({onType, ...rest}) => {
    return <input
        onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            if(typeof onType === 'function') onType(e.target.value);
        }, [onType])}
        {...rest}
    />;
};

export default TextField;

export interface TextInputProps extends HTMLProps<HTMLInputElement> {
    onType?(str: string): void,
}

export const TextInput: (props: TextInputProps) => React.ReactElement = ({onType, ...rest}) => {
    return <input
        onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            if(typeof onType === 'function') onType(e.target.value);
        }, [onType])}
        {...rest}
    />;
};
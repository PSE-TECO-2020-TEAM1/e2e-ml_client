import React, { useCallback } from 'react';
import { Input as MUIInput, InputProps, StandardTextFieldProps, TextField as MUITextField } from '@material-ui/core';
// import { borderedTextFieldStylesHook } from '@mui-treasury/styles/textField/bordered';

export interface TextFieldProps extends StandardTextFieldProps {
    onType?(str: string): void
}

const TextField: (props: TextFieldProps) => React.ReactElement = ({onType, ...rest}) => {
    // const inputBaseStyles = borderedTextFieldStylesHook.useInputBase();
    // const inputLabelStyles = borderedTextFieldStylesHook.useInputLabel();

    return <MUITextField
        fullWidth
        onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            if(typeof onType === 'function') onType(e.target.value);
        }, [onType])}
        // InputLabelProps={{ shrink: true, classes: inputLabelStyles }}
        // InputProps={{ classes: inputBaseStyles, disableUnderline: true }}
        {...rest}
    />;
};

export default TextField;

export interface TextInputProps extends InputProps {
    onType?(str: string): void,
    min?: number,
    max?: number
    step?: number
}

export const TextInput: (props: TextInputProps) => React.ReactElement = ({onType, ...rest}) => {

    return <MUIInput
        fullWidth
        onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            if(typeof onType === 'function') onType(e.target.value);
        }, [onType])}
        {...rest}
    />;
};
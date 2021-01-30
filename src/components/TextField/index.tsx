import React from 'react';
import { TextField as MUITextField, TextFieldProps } from '@material-ui/core';
import { borderedTextFieldStylesHook } from '@mui-treasury/styles/textField/bordered';

const TextField: (props: TextFieldProps) => React.ReactElement = ({...rest}) => {
    const inputBaseStyles = borderedTextFieldStylesHook.useInputBase();
    const inputLabelStyles = borderedTextFieldStylesHook.useInputLabel();

    return <MUITextField
        fullWidth
        InputLabelProps={{ shrink: true, classes: inputLabelStyles }}
        InputProps={{ classes: inputBaseStyles, disableUnderline: true }}
        {...rest}
    />;
};

export default TextField;
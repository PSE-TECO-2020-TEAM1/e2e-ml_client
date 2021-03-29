import React, { HTMLProps, useCallback } from 'react';

interface FormProps extends HTMLProps<HTMLFormElement> {
    onSubmit: () => void 
};

const Form = ({ onSubmit, children, ...rest }: FormProps) => 
    <form onSubmit={useCallback(e => {e.preventDefault(); onSubmit();}, [onSubmit])} {...rest}>{children}</form>;

export default Form;
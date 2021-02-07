import React from 'react';
import { Button } from '@material-ui/core';

import Wrapper from 'components/Wrapper';
import TextField from 'components/TextField';

import styles from './index.module.scss';
const { main, incorrect, active, header } = styles;

export type LoginPageViewProps = {
    user: string,
    onUser: (s: string) => void,
    pass: string,
    onPass: (s: string) => void,
    onButton: () => void,
    invalid: boolean
};

const LoginPageView = ({ user, onUser, pass, onPass, onButton, invalid }: LoginPageViewProps) => 
    <Wrapper size="small" className={main}>
        <label className={header}>Please enter your credentials.</label>
        <TextField error={invalid} label="Username" value={user} onType={onUser} />
        <TextField error={invalid} label="Password" type="password" value={pass} onType={onPass} />
        <label className={`${incorrect} ${invalid ? active : ''}`}>Invalid credentials entered.</label>
        <Button disabled={invalid} onClick={onButton}>Log In</Button>
    </Wrapper>;

export default LoginPageView;

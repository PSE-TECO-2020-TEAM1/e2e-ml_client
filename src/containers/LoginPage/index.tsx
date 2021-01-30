import React, { useCallback, useState } from 'react';
import { useQueryParams, navigate } from 'raviger';
import { Button } from '@material-ui/core';

import { useAPI, useBoolean, useMountEffect } from 'lib/hooks';

import { rootRoute } from 'routes';
import Wrapper from 'components/Wrapper';
import TextField from 'components/TextField';

import styles from './index.module.scss';
const { main, incorrect, active, header } = styles;

const LoginPage = () => {
    const [user, setUser] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [invalid, setInvalid, clearInvalid] = useBoolean();

    const api = useAPI();
    const [{ ref }] = useQueryParams();

    useMountEffect(() => {
        if (api.isAuthenticated()) navigate(rootRoute);
    });

    return (
        <Wrapper size="small" className={main}>
            <label className={header}>Please enter your credentials.</label>
            <TextField
                error={invalid}
                label="Username"
                value={user}
                onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
                    setUser(e.target.value);
                    clearInvalid();
                }, [clearInvalid])}
            />
            <TextField
                error={invalid}
                label="Password"
                type="password"
                value={pass}
                onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
                    setPass(e.target.value);
                    clearInvalid();
                }, [clearInvalid])}
            />
            <label className={`${incorrect} ${invalid ? active : ''}`}>Invalid credentials entered.</label>
            <Button
                disabled={invalid}
                onClick={async () => {
                    const success = await api.login(user, pass);
                    if (success) {
                        clearInvalid();
                        if (ref) navigate(ref);
                        else navigate(rootRoute);
                        return;
                    }
                    setInvalid();
                    // toaster.danger('Wrong username or password');
                }}
            >Log In</Button>
        </Wrapper>
    );
};

export default LoginPage;

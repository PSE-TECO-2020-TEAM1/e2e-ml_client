import React, { useCallback, useState } from 'react';
import { navigate } from 'raviger';

import { useAPI, useMountEffect } from 'lib/hooks';

import { loginRoute, rootRoute } from 'routes';
import Wrapper from 'components/Wrapper';
import { Button } from '@material-ui/core';

import TextField from 'components/TextField';
import styles from 'containers/LoginPage/index.module.scss';
const { main, incorrect, active, header } = styles;

const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validateEmail = (email: string): boolean => {
    return re.test(email);
};

const SignupPage = () => {
    const [user, setUser] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const api = useAPI();

    useMountEffect(() => {
        if (api.isAuthenticated()) navigate(rootRoute);
    });
    const wrongEmail = !validateEmail(email);
    return (
        <Wrapper size="small" className={main}>
            <label className={header}>Please enter your information to sign up.</label>
            <TextField
                label="Username"
                value={user}
                onType={useCallback((str: string) => {
                    setUser(str);
                }, [])}
            />
            <TextField
                label="Password"
                type="password"
                value={pass}
                onType={useCallback((str: string) => {
                    setPass(str);
                }, [])}
            />
            <TextField
                error={wrongEmail}
                label="Email"
                type="email"
                value={email}
                onType={useCallback((str: string) => {
                    setEmail(str);
                }, [])}
            />
            <label className={`${incorrect} ${wrongEmail ? active : ''}`}>{wrongEmail
                ? 'Invalid email format'
                : 'Can\'t sign up using given credentials'
            }</label>
            <Button
                disabled={wrongEmail}
                onClick={async () => {
                    try {
                        await api.signup(user, pass, email);
                        navigate(loginRoute);
                    } catch(e) {
                        // toaster.danger('Can\'t signup using given data, check input');
                    }
                }}
            >
                Sign up
            </Button>
        </Wrapper>
    );
};

export default SignupPage;

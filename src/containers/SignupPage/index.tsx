import React, { Fragment, useCallback, useState } from 'react';
import { TextInputField, Text, Button, toaster } from 'evergreen-ui';
import { navigate } from 'raviger';

import { useAPI, useMountEffect } from 'lib/hooks';

import { loginRoute, rootRoute } from 'routes';

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

    return (
        <Fragment>
            <Text>
                Please enter your information to sign up.
            </Text>
            <TextInputField
                label="Username"
                value={user}
                onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
                    setUser(e.target.value);
                }, [])}
            />
            <TextInputField
                label="Password"
                type="password"
                value={pass}
                onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
                    setPass(e.target.value);
                }, [])}
            />
            <TextInputField
                isInvalid={!validateEmail(email)}
                label="E-mail"
                type="email"
                value={email}
                onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                }, [])}
            />
            <Button
                disabled={!validateEmail(email)}
                onClick={async () => {
                    try {
                        await api.signup(user, pass, email);
                        navigate(loginRoute);
                    } catch(e) {
                        toaster.danger('Can\'t signup using given data, check input');
                    }
                }}
            >
                Sign up
            </Button>
        </Fragment>
    );
};

export default SignupPage;

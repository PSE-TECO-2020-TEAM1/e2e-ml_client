import React, { Fragment, useCallback, useState } from 'react';
import { TextInputField, Text, Button, toaster } from 'evergreen-ui';
import { useQueryParams, navigate } from 'raviger';

import { useAPI, useBoolean, useMountEffect } from 'lib/hooks';

import { rootRoute } from 'routes';

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
        <Fragment>
            <Text>
                Please enter your credentials.
            </Text>
            <TextInputField
                isInvalid={invalid}
                label="Username"
                value={user}
                onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
                    setUser(e.target.value);
                    clearInvalid();
                }, [clearInvalid])}
            />
            <TextInputField
                isInvalid={invalid}
                label="Password"
                type="password"
                value={pass}
                onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
                    setPass(e.target.value);
                    clearInvalid();
                }, [clearInvalid])}
            />
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
                    toaster.danger('Wrong username or password');
                }}
            >
                Log In
            </Button>
        </Fragment>
    );
};

export default LoginPage;

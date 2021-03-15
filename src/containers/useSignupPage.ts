import { useCallback, useState } from 'react';
import { navigate } from 'raviger';

import { useAPI, useMountEffect } from 'lib/hooks';

import { loginRoute, rootRoute } from 'routes';
import { SignupPageViewProps } from 'components/SignupPageView';
import { useSignupHeader } from 'lib/hooks/Header';

const useSignupPage = (): SignupPageViewProps => {
    const [user, setUser] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const api = useAPI();
    useSignupHeader();

    useMountEffect(() => {
        if (api.isAuthenticated()) navigate(rootRoute);
    });

    const onUser = useCallback((str: string) => {
        setUser(str);
    }, []);

    const onEmail = useCallback((str: string) => {
        setEmail(str);
    }, []);

    const onPass = useCallback((str: string) => {
        setPass(str);
    }, []);

    const onButton = async () => {
        await api.signup(user, pass, email);
        navigate(loginRoute);
    };

    return { user, pass, onUser, onPass, onButton, email, onEmail };
};

export default useSignupPage;

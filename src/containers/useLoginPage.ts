import { useCallback, useState } from 'react';
import { useQueryParams, navigate } from 'raviger';

import { useAPI, useMountEffect } from 'lib/hooks';

import { rootRoute } from 'routes';
import { LoginPageViewProps } from 'components/LoginPageView';
import { useLoginHeader } from 'lib/hooks/Header';

const useLoginPage = (): LoginPageViewProps => {
    const [user, setUser] = useState<string>('');
    const [pass, setPass] = useState<string>('');

    const api = useAPI();
    // useLoginHeader();
    const [{ ref }] = useQueryParams();

    useMountEffect(() => {
        if (api.isAuthenticated()) navigate(rootRoute);
    });

    const onUser = useCallback((str: string) => {
        setUser(str);
    }, []);

    const onPass = useCallback((str: string) => {
        setPass(str);
    }, []);

    const onButton = async () => {
        await api.login(user, pass);
        if (ref) navigate(ref);
        else navigate(rootRoute);
    };

    return { user, pass, onUser, onPass, onButton };
};

export default useLoginPage;

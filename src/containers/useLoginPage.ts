import { useCallback, useState } from 'react';
import { useQueryParams, navigate } from 'raviger';

import { useAPI, useBoolean, useMountEffect } from 'lib/hooks';

import { rootRoute } from 'routes';
import { LoginPageViewProps } from 'components/LoginPageView';
import { useLoginHeader } from 'lib/hooks/Header';

const useLoginPage = (): LoginPageViewProps => {
    const [user, setUser] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [invalid, setInvalid, clearInvalid] = useBoolean();

    const api = useAPI();
    // useLoginHeader();
    const [{ ref }] = useQueryParams();

    useMountEffect(() => {
        if (api.isAuthenticated()) navigate(rootRoute);
    });

    const onUser = useCallback((str: string) => {
        setUser(str);
        clearInvalid();
    }, [clearInvalid]);

    const onPass = useCallback((str: string) => {
        setPass(str);
        clearInvalid();
    }, [clearInvalid]);

    const onButton = async () => {
        const success = await api.login(user, pass);
        if (success) {
            clearInvalid();
            if (ref) navigate(ref);
            else navigate(rootRoute);
            return;
        }
        setInvalid();
        // toaster.danger('Wrong username or password');
    };

    return { user, pass, onUser, onPass, onButton, invalid };
};

export default useLoginPage;

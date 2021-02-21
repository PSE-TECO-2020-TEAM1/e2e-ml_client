import { HeaderViewProps } from 'components/HeaderView';
import { useAPI } from 'lib/hooks';
import { HeaderContext } from 'lib/hooks/Header';
import { useCallback, useContext } from 'react';
import { loginRoute, signupRoute } from 'routes';

const useHeaderView = (): HeaderViewProps => {
    const state = useContext(HeaderContext);
    const api = useAPI();

    const logout = useCallback(() => {
        api.logout();
    }, [api]);

    if ('breadcrumbs' in state[0]) {
        return { crumbs: state[0].breadcrumbs, logout };
    }

    if ('login' in state[0]) {
        return { signup: signupRoute };
    }

    if ('signup' in state[0]) {
        return { login: loginRoute };
    }

    return {};
};

export default useHeaderView;
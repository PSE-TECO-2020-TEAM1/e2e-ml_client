import { HeaderViewProps } from 'components/HeaderView';
import { useAPI } from 'lib/hooks';
import { HeaderContext } from 'lib/hooks/Header';
import { useCallback, useContext } from 'react';
import { loginRoute, signupRoute, workspacesListRoute } from 'routes';

const useHeaderView = (): HeaderViewProps => {
    const [state] = useContext(HeaderContext);
    const api = useAPI();

    const logout = useCallback(() => {
        api.logout();
    }, [api]);

    if ('breadcrumbs' in state) {
        const crumbs = [];
        crumbs.push({ name: 'Workspaces', href: workspacesListRoute });
        return { crumbs, logout };
    }

    if ('login' in state) {
        return { signup: signupRoute };
    }

    if ('signup' in state) {
        return { login: loginRoute };
    }

    return {};
};

export default useHeaderView;
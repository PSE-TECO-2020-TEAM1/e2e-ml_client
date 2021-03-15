import { HeaderViewProps } from 'components/HeaderView';
import assert from 'lib/assert';
import { useAPI, usePromise } from 'lib/hooks';
import { HeaderContext } from 'lib/hooks/Header';
import { useCallback, useContext } from 'react';
import { loginRoute, modelDetailsRoute, sampleRoute, signupRoute, workspaceRoute, workspacesListRoute } from 'routes';

const useHeaderView = (): HeaderViewProps => {
    const [state] = useContext(HeaderContext);
    const api = useAPI();

    const crumbsPH = usePromise(async () => {
        if ('raw' in state) return [state.raw];
        if (!('breadcrumbs' in state)) return [];

        const crumbs = [];
        if (typeof state.breadcrumbs.workspaceId !== 'undefined') {
            crumbs.push({ name: 'Workspaces', href: workspacesListRoute });
            const workspaceName = (await api.getWorkspaces()).find(v => v.id === state.breadcrumbs.workspaceId)?.name;
            if (workspaceName) crumbs.push({ name: workspaceName, href: workspaceRoute(state.breadcrumbs.workspaceId) });
        }

        if (typeof state.breadcrumbs.modelId !== 'undefined') {
            assert(typeof state.breadcrumbs.workspaceId !== 'undefined');
            const modelName = (await api.getModelDetails(state.breadcrumbs.workspaceId, state.breadcrumbs.modelId)).name;
            if (modelName) crumbs.push({ name: modelName, href: modelDetailsRoute(state.breadcrumbs.workspaceId, state.breadcrumbs.modelId) });
        }

        if (typeof state.breadcrumbs.sampleId !== 'undefined') {
            assert(typeof state.breadcrumbs.workspaceId !== 'undefined');
            crumbs.push({ name: `Sample ${state.breadcrumbs.sampleId}`, href: sampleRoute(state.breadcrumbs.workspaceId, state.breadcrumbs.sampleId) });
        }

        if (typeof state.breadcrumbs.dangle !== 'undefined') {
            crumbs.push(state.breadcrumbs.dangle);
        }

        return crumbs;
    }, [state]);

    const logout = useCallback(() => {
        api.logout();
    }, [api]);

    if ('breadcrumbs' in state) {
        console.log('crumbsph', crumbsPH);
        return { crumbsPH, logout };
    }

    if ('login' in state) {
        return { signup: signupRoute };
    }

    if ('signup' in state) {
        return { login: loginRoute };
    }

    if ('raw' in state) {
        return { crumbsPH };
    }

    return {};
};

export default useHeaderView;
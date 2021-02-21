import assert from 'lib/assert';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { modelsRoute, sampleRoute, workspaceRoute } from 'routes';
import { usePromise } from '.';
import useAPI from './API';
import { State as PromiseState } from './Promise';

type NamedHref = { name: string, href: string };
type State = 
    { login: true }
    | { signup: true }
    | { breadcrumbs: (NamedHref | string)[] }
    | {};

export const HeaderContext = React.createContext<[State, React.Dispatch<React.SetStateAction<State>>]>([{}, () => {console.log('bad shit happened');}]);
export const HeaderProvider = HeaderContext.Provider;

const wMemo = {};
const mMemo = {};
const memo = <T>(cache: Record<string, T>, fn : (...x: any[]) => Promise<T>) => async (x: string, ...arg: any[]) => {
    if (cache[x]) return cache[x];
    cache[x] = await fn(...arg);
    return cache[x];
};

type HeaderOptions = {
    workspaceId?: string
    modelId?: string
    sampleId?: string
    dangle?: string
};
export const useHeader = ({ workspaceId, modelId, sampleId, dangle }: HeaderOptions) => {
    const [, dispatch] = useContext(HeaderContext);
    const api = useAPI();
    const [wState, workspace] = usePromise(async () => {
        if (!workspaceId) return;
        return (await memo(wMemo, api.getWorkspaces.bind(api))(workspaceId)).find(x => x.id === workspaceId)?.name;
    }, []);
    const [mState, model] = usePromise(async () => {
        if (!modelId) return;
        return (await memo(mMemo, api.getModelDetails.bind(api))(`${workspaceId}!${modelId}`, workspaceId, modelId)).name;
    }, []);
    
    useEffect(() => {
        if (wState !== PromiseState.Resolved || mState !== PromiseState.Resolved) return;
        const arr = [];
        if (workspace) {
            assert(typeof workspaceId !== 'undefined');
            arr.push({ name: workspace, href: workspaceRoute(workspaceId) });
        }
        if (model) {
            assert(typeof workspaceId !== 'undefined');
            arr.push({ name: model, href: modelsRoute(workspaceId) }); 
        }
        if (sampleId) {
            assert(typeof workspaceId !== 'undefined');
            arr.push({ name: 'Sample', href: sampleRoute(workspaceId, sampleId) });
        }
        if (dangle) {
            arr.push(dangle);
        }
        
        dispatch({ breadcrumbs: arr });
    }, [dangle, dispatch, mState, model, sampleId, wState, workspace, workspaceId]);
};

export const useLoginHeader = () => {
    const [, dispatch] = useContext(HeaderContext);
    dispatch({ login: true });
};

export const useSignupHeader = () => {
    const [, dispatch] = useContext(HeaderContext);
    dispatch({ signup: true });
};

export const useHeaderDispatcher: () => [State, React.Dispatch<React.SetStateAction<State>>] = () => {
    return useState<State>({});
};
import React, { useCallback, useContext, useState } from 'react';
import HeaderView from 'components/HeaderView';
import useHeaderView from 'containers/useHeaderView';
import { useMountEffect } from '.';

type Crumbs = {
    workspaceId?: string
    modelId?: string
    sampleId?: string
    dangle?: string
};
type State = 
    { login: true }
    | { signup: true }
    | { breadcrumbs: Crumbs }
    | {};

export const HeaderContext = React.createContext<[State, React.Dispatch<React.SetStateAction<State>>]>([{}, () => {console.log('bad things happened');}]);

const Header = () => <HeaderView {...useHeaderView()}/>;
export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
    return <HeaderContext.Provider value={useState<State>({})}>
        <Header />
        {children}
    </HeaderContext.Provider>;
};

export const useHeader = (c: Crumbs) => {
    const [, dispatch] = useContext(HeaderContext);
    useMountEffect(() => dispatch({ breadcrumbs: c }));

    return useCallback((c: Crumbs) => dispatch({ breadcrumbs: c }), [dispatch]); 
};

export const useLoginHeader = () => {
    const [, dispatch] = useContext(HeaderContext);
    useMountEffect(() => dispatch({ login: true }));
};

export const useSignupHeader = () => {
    const [, dispatch] = useContext(HeaderContext);
    useMountEffect(() => dispatch({ signup: true }));
};
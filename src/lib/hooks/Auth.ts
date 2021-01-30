import { navigate, usePath } from 'raviger';
import React, { useContext } from 'react';
import useAPI from './API';

const AuthContext = React.createContext<string>('/');
export const AuthProvider = AuthContext.Provider;

const useAuth = () => {
    const route = useContext(AuthContext);
    
    const api = useAPI();
    const path = usePath();
    if (api.isAuthenticated()) return;
    if (path.startsWith(route)) return;
    navigate(`${route}?ref=${path}`);
};

export default useAuth;
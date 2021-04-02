import { renderHook } from '@testing-library/react-hooks';
import API from 'lib/API';
import useAuth from 'lib/hooks/Auth';
import React from 'react';
import { useContext } from 'react';
import TestRenderer from 'react-test-renderer';
const APIContext = React.createContext<API>(new API);

describe('useAuth tests', () => {
    it('returns nothing if already authenticated', () => {
        const { result } = renderHook(() => useAuth()); 
        const api = useContext(APIContext);
        expect(result).toBe(api);
    });
    it('returns nothing if path starts with root', () => {
        const { result } = renderHook(() => useAuth()); 
        const api = useContext(APIContext);
        expect(result).toBe(api);
    });
    
});
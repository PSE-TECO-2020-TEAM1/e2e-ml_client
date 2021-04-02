import { renderHook } from '@testing-library/react-hooks';
import API from 'lib/API';
import useCounter from 'lib/hooks/Countdown';
import React from 'react';
import { useContext } from 'react';
import TestRenderer from 'react-test-renderer';
const APIContext = React.createContext<API>(new API);

describe('useCounter tests', () => {
    it('returns nothing if already authenticated', () => {
        const { result } = renderHook(() => useCounter()); 
        const api = useContext(APIContext);
        expect(result).toBe(api);
    });
   
});
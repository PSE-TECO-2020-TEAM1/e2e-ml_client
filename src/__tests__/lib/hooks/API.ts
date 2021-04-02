import { renderHook } from '@testing-library/react-hooks';
import API from 'lib/API';
import useAPI from 'lib/hooks/API';
import React from 'react';
import { useContext } from 'react';
import TestRenderer from 'react-test-renderer';
const APIContext = React.createContext<API>(new API);

describe('useapi tests', () => {
    it('returns api when defined', () => {
        const { result } = renderHook(() => useAPI()); 
        const api = useContext(APIContext);
        expect(result).toBe(api);
    });

    
});
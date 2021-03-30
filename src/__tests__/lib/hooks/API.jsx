import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useAPI, { APIProvider } from 'lib/hooks/API';

const fakeAPI = { a: 1, b: 2 };

describe('useAPI tests', () => {
    it('returns the API instance when one is given by the context', () => {
        const wrapper = ({ children }) => <APIProvider value={fakeAPI}>{children}</APIProvider>

        const { result } = renderHook(() => useAPI(), { wrapper }); 
        
        expect(result.current).toBe(fakeAPI);
    });

    it('throws an Error when api is undefined', () => {
        const wrapper = ({ children }) => <APIProvider value={undefined}>{children}</APIProvider>

        const { result } = renderHook(() => useAPI(), { wrapper }); 

        expect(result.error).toEqual(Error('useAPI called without an APIProvider'));
    });
});
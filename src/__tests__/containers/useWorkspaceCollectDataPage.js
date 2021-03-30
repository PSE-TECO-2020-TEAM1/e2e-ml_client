import { renderHook } from '@testing-library/react-hooks';
import useWorkspaceCollectDataPage from 'containers/useWorkspaceCollectDataPage';
import { useAPI, useAuth, usePromise } from 'lib/hooks';
import { useHeader } from 'lib/hooks/Header';

jest.mock('lib/hooks', () => {
    return {
        useAPI: jest.fn(),
        useAuth: jest.fn(),
        usePromise: jest.fn(),
    }
})

jest.mock('lib/hooks/Header', () => ({
    useHeader: jest.fn(),
}));

jest.mock('routes', () => ({
    createCollectionLink: x => x
}));

describe('useWorkspaceCollectDataPage', () => {
    it('returns correct collectLink PromisePack dependant on workspaceId', () => {
        usePromise.mockImplementation(x => x());
        const getDataCollectionIDMock = jest.fn()
        useAPI.mockReturnValue({ getDataCollectionID: getDataCollectionIDMock });
        getDataCollectionIDMock.mockImplementation(x => Promise.resolve('address: ' + x));
        
        const { result } = renderHook(() => useWorkspaceCollectDataPage('testId123')); 

        expect(result.current.collectLinkPH).resolves.toBe('address: testId123');
    });

    it('is an authenticated endpoint', () => {
        renderHook(() => useWorkspaceCollectDataPage('testId123')); 

        expect(useAuth).toBeCalled();
    });

    it('updates the header once correctly', () => {
        renderHook(() => useWorkspaceCollectDataPage('testId123')); 

        expect(useHeader).toBeCalledTimes(1);
        expect(useHeader.mock.calls[0][0]).toEqual({ workspaceId: 'testId123', dangle: 'Collect Data' });
    });
});

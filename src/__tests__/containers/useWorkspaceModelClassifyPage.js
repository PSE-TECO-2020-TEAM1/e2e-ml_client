import { renderHook } from '@testing-library/react-hooks';
import useWorkspaceModelClassifyPage from 'containers/useWorkspaceModelClassifyPage';
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
    createClassificationLink: x => x
}));

describe('useWorkspaceCollectDataPage', () => {
    it('returns correct classifyLink PromisePack dependant on workspaceId and ModelId', () => {
        usePromise.mockImplementation(x => x());
        const getPredictionIDMock = jest.fn()
        useAPI.mockReturnValue({ getPredictionID: getPredictionIDMock });
        getPredictionIDMock.mockImplementation((x,y) => Promise.resolve('address: ' + x + ' '+ y));
        
        const { result } = renderHook(() => useWorkspaceModelClassifyPage('testId123','tmodelId')); 

        expect(result.current.classifyLinkPH).resolves.toBe('address: testId123 tmodelId');
    });

    it('is an authenticated endpoint', () => {
        renderHook(() => useWorkspaceModelClassifyPage('testId123','tmodelId')); 

        expect(useAuth).toBeCalled();
    });

    it('updates the header once correctly', () => {
        renderHook(() => useWorkspaceModelClassifyPage('testId123','tmodelId')); 

        expect(useHeader).toBeCalledTimes(1);
        expect(useHeader.mock.calls[0][0]).toEqual({ workspaceId: 'testId123', modelId: 'tmodelId', dangle: 'Classify' });
    });
});

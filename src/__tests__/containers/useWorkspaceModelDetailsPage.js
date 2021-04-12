import { renderHook } from '@testing-library/react-hooks';
import useWorkspaceModelDetailsPage from 'containers/useWorkspaceModelDetailsPage';
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



describe('useWorkspaceCollectDataPage', () => {
    //it('returns correct classifyLink PromisePack dependant on workspaceId and ModelId', () => {
      //  usePromise.mockImplementation(x => x());
        //const getModelDetailsMock = jest.fn()
        //useAPI.mockReturnValue({ getModelDetails: getModelDetailsMock });
        //getPredictionIDMock.mockImplementation((x,y) => Promise.resolve('address: ' + x + ' '+ y));
        
        //const { result } = renderHook(() => useWorkspaceModelDetailsPage('testId123','tmodelId')); 

        //expect(result.current.modelDetailsPH).resolves.toBe('address: testId123 tmodelId');
    //});

    it('is an authenticated endpoint', () => {
        renderHook(() => useWorkspaceModelDetailsPage('testId123','tmodelId')); 

        expect(useAuth).toBeCalled();
    });

    it('updates the header once correctly', () => {
        renderHook(() => useWorkspaceModelDetailsPage('testId123','tmodelId')); 

        expect(useHeader).toBeCalledTimes(1);
        expect(useHeader.mock.calls[0][0]).toEqual({ workspaceId: 'testId123', modelId: 'tmodelId' });
    });
});

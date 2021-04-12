import { renderHook } from '@testing-library/react-hooks';
import useWorkspaceModelClassifyPage from 'containers/useWorkspaceModels';
import { useAPI, useAuth, usePromise } from 'lib/hooks';
import { useHeader } from 'lib/hooks/Header';

jest.mock('lib/hooks', () => {
    return {
        useAPI: jest.fn(),
        useInvalidator: jest.fn(),
        usePromise: jest.fn(),
    }
})



describe('useWorkspaceModelsPage', () => {
    it('returns correctly the models dependant on workspaceId', () => {
        usePromise.mockImplementation(x => x());
        const getModelsMock = jest.fn()
        useAPI.mockReturnValue({ getModels: getModelsMock });
        getModelsMock.mockImplementation(x => Promise.resolve('address: ' + x + ' '));
        
        const { result } = renderHook(() => useWorkspaceModelClassifyPage('testId123')); 

        expect(result.current.ModelsPH).resolves.toBe('address: testId123 tmodelId');
    });

    //it('is an authenticated endpoint', () => {
    //    renderHook(() => useWorkspaceModelClassifyPage('testId123','tmodelId')); 

    //    expect(useAuth).toBeCalled();
    //});

    //it('updates the header once correctly', () => {
     //   renderHook(() => useWorkspaceModelClassifyPage('testId123','tmodelId')); 

      //  expect(useHeader).toBeCalledTimes(1);
      //  expect(useHeader.mock.calls[0][0]).toEqual({ workspaceId: 'testId123', modelId: 'tmodelId', dangle: 'Classify' });
    //});
});

import { renderHook } from '@testing-library/react-hooks';
import useLoginPage from 'containers/useLoginPage';
import { useAPI, useMountEffect } from 'lib/hooks';
import { useLoginHeader } from 'lib/hooks/Header';

jest.mock('lib/hooks', () => {
    return {
        useAPI: jest.fn(),
        useMountEffect: jest.fn(),
        usePromise: jest.fn(),
    }
})

jest.mock('lib/hooks/Header', () => ({
    useLoginHeader: jest.fn(),
}));

jest.mock('routes', () => ({
    createClassificationLink: x => x
}));

describe('useLoginPage', () => {
    it('returns correct dependant on workspaceId and ModelId', () => {
        useMountEffect.mockImplementation(x => x());
        const isAuthenticatedMock = jest.fn()
        useAPI.mockReturnValue({ isAuthenticated: isAuthenticatedMock });
        isAuthenticatedMock.mockImplementation(() => true);
        
        const { result } = renderHook(() => useLoginPage()); 

        //expect(result.current.classifyLinkPH).resolves.toBe('address: testId123 tmodelId');
    });

    //it('is an authenticated endpoint', () => {
      //  renderHook(() => useWorkspaceModelClassifyPage('testId123','tmodelId')); 

        //expect(useAuth).toBeCalled();
    //});

    it('updates the Login header once correctly', () => {
        renderHook(() => useLoginPage()); 

        expect(useLoginHeader).toBeCalledTimes(1);
    });
});

import { renderHook } from '@testing-library/react-hooks';
import useSignupPage from 'containers/useSignupPage';
import { useAPI, useMountEffect } from 'lib/hooks';
import { useSignupHeader } from 'lib/hooks/Header';

jest.mock('lib/hooks', () => {
    return {
        useAPI: jest.fn(),
        useMountEffect: jest.fn(),
    }
})

jest.mock('lib/hooks/Header', () => ({
    useSignupHeader: jest.fn(),
}));

//jest.mock('routes', () => ({
  //  createClassificationLink: x => x
//}));

describe('useSignupPage', () => {
    it('returns correct x dependant on workspaceId and ModelId', () => {
        useMountEffect.mockImplementation(x => x());
        const isAuthenticatedMock = jest.fn()
        useAPI.mockReturnValue({ isAuthenticated: isAuthenticatedMock });
       isAuthenticatedMock.mockImplementation(() => true);
        
       const { result } = renderHook(() => useSignupPage()); 

        //expect(result.current.classifyLinkPH).resolves.toBe('address: testId123 tmodelId');
    });

    //it('is an authenticated endpoint', () => {
      //  renderHook(() => useWorkspaceModelClassifyPage('testId123','tmodelId')); 

        //expect(useAuth).toBeCalled();
    //});

    it('updates the signup header once correctly', () => {
        renderHook(() => useSignupPage()); 

        expect(useSignupHeader).toBeCalledTimes(1);
    });
});

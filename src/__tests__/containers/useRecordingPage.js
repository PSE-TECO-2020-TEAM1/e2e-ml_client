import { renderHook } from '@testing-library/react-hooks';
import useRecordingPage from 'containers/useRecordingPage';
import { useAPI, useBoolean, useCountdown, usePromise } from 'lib/hooks';
import { useBareHeader } from 'lib/hooks/Header';


jest.mock('lib/hooks', () => {
    return {
        useAPI: jest.fn(),
        useBoolean: jest.fn(),
        useCountdown: jest.fn(),
        usePromise: jest.fn(),
    }
})

jest.mock('lib/hooks/Header', () => ({
    useBareHeader: jest.fn(),
}));

jest.mock('routes', () => ({
    getSubmissionConfiguration: x => x
}));

describe('useWorkspaceCollectDataPage', () => {
    it('returns correct labelPH dependant on submissionID', () => {
        usePromise.mockImplementation(x => x());
        const getSubmissionConfigurationMock = jest.fn()
        useAPI.mockReturnValue({ getSubmissionConfiguration: getSubmissionConfigurationMock });
        getSubmissionConfigurationMock.mockImplementation(x => Promise.resolve('label of: ' + x  ));
        
        const { result } = renderHook(() => useRecordingPage('submissiontestID')); 
         

       //expect(result.current.state).resolves.toBe('label of: submissiontestID');
    });

    

    it('updates the bare header once correctly', () => {
        renderHook(() => useRecordingPage('submissiontestID')); 

        expect(useCountdown).toBeCalledTimes(1);
        expect(useCountdown).toBeCalledTimes(1);
       
        //expect(useBareHeader.mock.calls[0][0]).toEqual('Record Data');
    });
});

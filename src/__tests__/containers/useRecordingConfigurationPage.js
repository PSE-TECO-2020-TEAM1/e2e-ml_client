import { renderHook } from '@testing-library/react-hooks';
import useRecordingConfigurationPage from 'containers/useRecordingConfigurationPage';
import { useAPI, useAuth, usePromise } from 'lib/hooks';
import { useBareHeader } from 'lib/hooks/Header';
import { labelQueryParam, recordingRoute } from 'routes';

jest.mock('lib/hooks', () => {
    return {
        useAPI: jest.fn(),
        useAuth: jest.fn(),
        usePromise: jest.fn(),
    }
})

jest.mock('lib/hooks/Header', () => ({
    useBareHeader: jest.fn(),
}));

jest.mock('routes', () => ({
    recordingRoute: x => x
}));

describe('useWorkspaceCollectDataPage', () => {
    it('returns correct href dependant on submissiontestID', () => {
        //recordingRoute.mockImplementation((x,y,z,p) => x);
        
       const { result } = renderHook(() => useRecordingConfigurationPage('submissiontestID')); 

        expect(result.current.href).toBe('submissiontestID');
    });

    

    it('updates the bare header once correctly', () => {
        renderHook(() => useRecordingConfigurationPage('submissiontestID')); 

        expect(useBareHeader).toBeCalledTimes(1);
        expect(useBareHeader.mock.calls[0][0]).toEqual('Recording Configuration');
    });
});

import { renderHook } from '@testing-library/react-hooks';
import useLabelSelectionPage from 'containers/useLabelSelectionPage';
import { useAPI, useInvalidator, usePromise } from 'lib/hooks';
import { useBareHeader } from 'lib/hooks/Header';
import { recordingConfigurationRoute } from 'routes';

jest.mock('lib/hooks', () => {
    return {
        useAPI: jest.fn(),
        useInvalidator: jest.fn(),
        usePromise: jest.fn(),
    }
})

jest.mock('lib/hooks/Header', () => ({
    useBareHeader: jest.fn(),
}));

jest.mock('routes', () => ({
    recordingConfigurationRoute: x => x
}));

describe('useWorkspaceCollectDataPage', () => {
    //it('returns correct labelPH dependant on submissionID', () => {
        //usePromise.mockImplementation(x => x());
       // useInvalidator.mockImplementation(() => [true, jest.fn]);
       // const getSubmissionConfigurationMock = jest.fn()
       // useAPI.mockReturnValue({ getSubmissionConfiguration: getSubmissionConfigurationMock });
       // getSubmissionConfigurationMock.mockImplementation((x,y) => Promise.resolve('label of: ' + x + y ));
        
        //const { result } = renderHook(() => useLabelSelectionPage('submissiontestID')); 
         

       // expect(result.current.labelsPH).resolves.toBe('label of: submissiontestID');
    //});

    

    it('updates the bare header once correctly', () => {
        renderHook(() => useLabelSelectionPage('submissiontestID')); 

        expect(useBareHeader).toBeCalledTimes(1);
        expect(useBareHeader.mock.calls[0][0]).toEqual('Label Selection');
    });
});

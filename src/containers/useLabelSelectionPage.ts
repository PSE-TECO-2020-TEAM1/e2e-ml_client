import { LabelSelectionPageViewProps } from 'components/LabelSelectionPageView';
import { useAPI, useInvalidator, usePromise } from 'lib/hooks';
import { useBareHeader } from 'lib/hooks/Header';
import { recordingConfigurationRoute } from 'routes';

const useLabelSelectionPage = (submissionId: string): LabelSelectionPageViewProps => {
    const api = useAPI();
    useBareHeader('Label Selection');

    const [validity] = useInvalidator();

    const labelsPH = usePromise(async () => {
        const { labels } = await api.getSubmissionConfiguration(submissionId);

        return labels.map(({ name }) => ({ label: name, href: recordingConfigurationRoute(submissionId, name) }));
    }, [submissionId, validity]);

    return { labelsPH };
};

export default useLabelSelectionPage;
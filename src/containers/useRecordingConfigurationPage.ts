import { RecordingConfigurationPageViewProps } from 'components/RecordingConfigurationPageView';
import { useQueryParams } from 'raviger';
import { useState } from 'react';
import { labelQueryParam, recordingRoute } from 'routes';

const DEFAULT_DURATION = 5;
const DEFAULT_COUNTDOWN = 3;

const useRecordingConfigurationPage = (submissionId: string): RecordingConfigurationPageViewProps => {
    const [{ [labelQueryParam]: label }] = useQueryParams();

    const [duration, setDuration] = useState(DEFAULT_DURATION);
    const [countdown, setCountdown] = useState(DEFAULT_COUNTDOWN);

    const onDuration = (n: number) => setDuration(n || 0);
    const onCountdown = (n: number) => setCountdown(n || 0);

    const href = recordingRoute(submissionId, label, countdown, duration);

    return { duration, countdown, onCountdown, onDuration, href };
};

export default useRecordingConfigurationPage;
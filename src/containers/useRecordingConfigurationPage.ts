import { RecordingConfigurationPageViewProps } from 'components/RecordingConfigurationPageView';
import { useQueryParams } from 'raviger';
import { useState } from 'react';
import { labelQueryParam, recordingRoute } from 'routes';
import { useBareHeader } from 'lib/hooks/Header';

const DEFAULT_DURATION = 5;
const DEFAULT_COUNTDOWN = 5;

const useRecordingConfigurationPage = (submissionId: string): RecordingConfigurationPageViewProps => {
    const [{ [labelQueryParam]: label }] = useQueryParams();
    useBareHeader('Recording Configuration');

    const [duration, setDuration] = useState<number | ''>(DEFAULT_DURATION);
    const [countdown, setCountdown] = useState<number | ''>(DEFAULT_COUNTDOWN);

    const onDuration = (n: number) => setDuration(n || '');
    const onCountdown = (n: number) => setCountdown(n || '');

    const href = recordingRoute(submissionId, label, countdown || 0, duration || 0);

    return { duration, countdown, onCountdown, onDuration, href };
};

export default useRecordingConfigurationPage;
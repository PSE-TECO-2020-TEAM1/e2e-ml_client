import { TrainingStateEnum } from 'lib/API/DesktopAPI';
import { useState } from 'react';
import useAPI from './API';
import useInterval from './Interval';
import useInvalidator from './Invalidator';
import usePromise from './Promise';

export type Training = [TrainingStateEnum, string | null];

const useTrainingState = (workspaceId: string, interval: number, requestSent: boolean = true): [TrainingStateEnum, string | null] => {
    const [value, setValue] = useState<TrainingStateEnum>();
    const [error, setError] = useState<null | string>(null);
    const api = useAPI();
    const [invalidator] = useInvalidator(interval);

    usePromise(async () => {
        if (!requestSent) return;
        if (value === TrainingStateEnum.NO_TRAINING_YET || value === TrainingStateEnum.TRAINING_SUCCESSFUL) return;
        const { state, error: err } = await api.getTrainingState(workspaceId);

        if (err) return setError(err);

        setValue(state);
    }, [invalidator, workspaceId]);

    return [value || TrainingStateEnum.NO_TRAINING_YET, error];
};
  
export default useTrainingState;
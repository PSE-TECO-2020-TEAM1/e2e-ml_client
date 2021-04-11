import { InlineAlert, majorScale, Pane, Spinner, Label, TickCircleIcon } from 'evergreen-ui';
import React from 'react';

type TrainingStateCounterProps = {
    training: [State, string | null]
}

export type State = 'NO_TRAINING_YET' | 'TRAINING_SUCCESSFUL' | 'TRAINING_INITIATED' | 'FEATURE_EXTRACTION' | 'MODEL_TRAINING' | 'CLASSIFICATION_REPORT';

const states: [State, string][] = Object.entries({
    TRAINING_INITIATED: 'Training initiated',
    FEATURE_EXTRACTION: 'Feature extraction',
    MODEL_TRAINING: 'Training the model on samples',
    CLASSIFICATION_REPORT: 'Classification reported',
    TRAINING_SUCCESSFUL: 'Training successful'
}) as [State, string][];

export const isOngoingTraining = (training: [State, string | null]) => !(training[0] === 'NO_TRAINING_YET' || training[0] === 'TRAINING_SUCCESSFUL');

export const TrainingStateCounter = ({ training: [current, error] }: TrainingStateCounterProps) => {
    return error
        ? <InlineAlert intent="danger">{Error}</InlineAlert>
        : <Pane>
            {states.map(([k, v], i) =>
                <Pane
                    display="flex"
                    gap={majorScale(1)}
                    alignItems="center"
                >
                    {current === k && k !== 'TRAINING_SUCCESSFUL'
                        ? <Spinner size={14} />
                        : i <= states.findIndex(x => x[0] === current)
                            ? <TickCircleIcon color="success" size={14}/>
                            : <Pane width={14} />}
                    <Label>{v}</Label>
                </Pane>
            )}
        </Pane>;
};

export default TrainingStateCounter;
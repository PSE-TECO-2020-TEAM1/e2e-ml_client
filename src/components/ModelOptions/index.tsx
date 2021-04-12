import Loading from 'components/Loading';
import { RadioGroup, TextInputField, Pane, Heading, majorScale, Button, InlineAlert } from 'evergreen-ui';
import { TrainingParameters } from 'lib/API/DesktopAPI';
import { Promised, PromisePack } from 'lib/hooks/Promise';
import { ETV } from 'lib/utils';
import React from 'react';
import { Component } from './Component';
import { HyperparameterConfiguration } from './HyperParameterConfiguration';
import { TrainingStateCounter, State as TrainingState } from './TrainingStateCounter';

export type ParamsType = PromisePack<{
    params: TrainingParameters;
    actions: {
        selectNormalizer: (sensor: string, component: string, n: string) => void;
        selectImputer: (sensor: string, component: string, n: string) => void;
        selectFeatures: (sensor: string, component: string, n: string[]) => void;
        setWindowSize: (n: number) => void;
        setSlidingStep: (n: number) => void;
        selectClassifier: (n: string) => void;
        setHyperparameter: (h: string, v: number | string) => void;
    };
}>;

export type State = {
    normalizer: Record<string, Record<string, string>>,
    imputation: Record<string, Record<string, string>>,
    features: Record<string, Record<string, string[]>>,
    classifier?: string,
    hyperparameters: Record<string, number | string>,
    slidingStep?: number,
    windowSize?: number
};

export type ModelOptionsProps = {
    sensorsAndComponentsPH: PromisePack<[string, readonly string[]][]>,
    paramsPH: ParamsType,
    state: State | undefined,
    name: string,
    onName: (n: string) => void
    onTrain: () => void,
    isValid: boolean,
    didSendRequestCorrectly: boolean,
    currentTrainingState: TrainingState,
    trainingError: string | null
};
export const format = (x: string) => x.split('_').map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()).join(' ');
export const mapRGroup = (x: string) => ({ value: x, label: format(x) });

const ModelOptions = ({
    paramsPH, state, name, onName, onTrain, isValid, didSendRequestCorrectly, sensorsAndComponentsPH,
    currentTrainingState, trainingError
}: ModelOptionsProps) => {
    if (typeof state === 'undefined') return <Loading/>;
    return <Pane display="flex" justifyContent="center">
        <Pane minWidth={`min(${majorScale(200)}px, 90vw)`} padding={majorScale(2)} display="grid" gridTemplateColumns="3fr 1fr" gap={majorScale(4)}>
            {/* left pane, (sensors) */}
            <Pane display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={majorScale(2)} alignItems="start" alignContent="start">
                <Promised promise={sensorsAndComponentsPH} pending={'loading...'}>{(sensorsAndComponents) =>
                    sensorsAndComponents.map(([sensor, components]) => <>
                        <Heading gridColumn="span 3" paddingTop={majorScale(2)}>{sensor}</Heading>
                        {components.map(component => <Pane>
                            <Heading paddingBottom={majorScale(1)} textAlign="center" size={400} >{`${sensor}, ${component}`}</Heading>
                            <Pane elevation={1}>
                                <Component paramsPH={paramsPH} state={state} sensor={sensor} component={component} />
                            </Pane>
                        </Pane>)}
                    </>)
                }</Promised>
            </Pane>

            <Pane alignSelf="start" top={0} position="sticky" padding={majorScale(2)} display="flex" flexDirection="column" gap={majorScale(2)}>
                <TextInputField {...{ marginBottom: 0 }} onChange={(e: ETV<string>) => onName(e.target.value)} label="Name" value={name} />
                <Heading>Classifier</Heading>
                <Promised promise={paramsPH} pending={'loading...'}>{({ params: { classifiers }, actions: { selectClassifier } }) =>
                    <RadioGroup
                        value={state.classifier}
                        options={classifiers.map(mapRGroup)}
                        onChange={(e: ETV<string>) => selectClassifier(e.target.value)}
                    />
                }</Promised>
                <Heading>Hyperparameters</Heading>
                <HyperparameterConfiguration paramsPH={paramsPH} state={state} />
                <Pane display="flex" flexDirection="row">
                    {didSendRequestCorrectly ? <InlineAlert intent="success">Training request has been sent!</InlineAlert> : null}
                    <Button marginLeft="auto" disabled={!isValid || didSendRequestCorrectly} alignSelf="flex-end" appearance="primary" onClick={onTrain}>Train</Button>
                </Pane>
                {didSendRequestCorrectly
                    ? <TrainingStateCounter
                        training={[currentTrainingState, trainingError]}
                    />
                    : null}
            </Pane>
        </Pane>
    </Pane>;
};

export default ModelOptions;
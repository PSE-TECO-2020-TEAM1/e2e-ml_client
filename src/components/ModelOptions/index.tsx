import { RadioGroup, TextInputField, Pane, Heading, majorScale, Button, InlineAlert } from 'evergreen-ui';
import { TrainingParameters } from 'lib/API/DesktopAPI';
import { Promised, PromisePack } from 'lib/hooks/Promise';
import { ETV } from 'lib/utils';
import React from 'react';
import { Component } from './Component';
import { HyperparameterConfiguration } from './HyperParameterConfiguration';

export type ParamsType = PromisePack<{
    params: TrainingParameters;
    actions: {
        selectNormalizer: (n: string) => void;
        selectImputer: (n: string) => void;
        setWindowSize: (n: number) => void;
        setSlidingStep: (n: number) => void;
        selectFeatures: (n: string[]) => void;
        selectClassifier: (n: string) => void;
        setHyperparameter: (h: string, v: number | string) => void;
    };
}>;

export type State = {
    normalizer?: string,
    imputation?: string,
    features: string[],
    classifier?: string,
    hyperparameters: Record<string, number | string>,
    slidingStep?: number,
    windowsSize?: number
};

export type ModelOptionsProps = {
    paramsPH: ParamsType,
    state: State,
    name: string,
    onName: (n: string) => void
    onTrain: () => void,
    isValid: boolean,
    didSendRequestCorrectly: boolean,
    sensorsAndComponents: [string, string][]
};
export const format = (x: string) => x.split('_').map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()).join(' ');
export const mapRGroup = (x: string) => ({ value: x, label: format(x) });

const ModelOptions = ({ paramsPH, state, name, onName, onTrain, isValid, didSendRequestCorrectly }: ModelOptionsProps) => {
    return <Pane padding={majorScale(2)} display="grid" gridTemplateColumns="2fr 1fr" gap={majorScale(4)}>
        <Pane display="flex" flexDirection="column" gap={majorScale(2)}>
            <Component paramsPH={paramsPH} state={state} />
        </Pane>

        <Pane elevation={1} padding={majorScale(2)} display="flex" flexDirection="column" gap={majorScale(2)}>
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
            <Button disabled={!isValid} alignSelf="flex-end" appearance="primary" onClick={onTrain}>Train</Button>
            {didSendRequestCorrectly ? <InlineAlert intent="success">Training request has been sent and accepted!</InlineAlert> : null}
        </Pane>
    </Pane>;
};

export default ModelOptions;
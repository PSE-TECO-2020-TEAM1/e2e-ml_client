import { ModelOptionsProps } from 'components/ModelOptions';
import { HyperparameterType, TrainingParameters } from 'lib/API/DesktopAPI';
import assert from 'lib/assert';
import { useAPI, useAuth, useBoolean, usePromise } from 'lib/hooks';
import { useHeader } from 'lib/hooks/Header';
import { useReducer, useState } from 'react';

type State = {
    normalizer?: string,
    imputation?: string,
    features: string[],
    classifier?: string,
    hyperparameters: Record<string, number | string>,
    windowSize?: number,
    slidingStep?: number,
};
enum ActionType {
    Hyperparameter,
    Override
}
type Action =
    { normalizer: string }
    | { imputation: string }
    | { slidingStep: number }
    | { windowSize: number }
    | { features: string[] }
    | { classifier: string, hyperparameters: Record<string, number | string>, windowSize: number, slidingStep: number }
    | { type: ActionType.Hyperparameter, parameter: string, value: number | string }
    | { type: ActionType.Override, state: State };
    

const reducer = (s: State, a: Action): State => {
    if ('type' in a) {
        switch(a.type) {
        case ActionType.Hyperparameter:
            return { ...s, hyperparameters: { ...s.hyperparameters, [a.parameter]: a.value } };
        case ActionType.Override:
            return a.state;
        }
    }
    
    if ('classifier' in a) return { ...s, classifier: a.classifier, hyperparameters: a.hyperparameters, windowSize: a.windowSize, slidingStep: a.slidingStep };
    if ('normalizer' in a) return { ...s, normalizer: a.normalizer };
    if ('imputation' in a) return { ...s, imputation: a.imputation };
    if ('features' in a) return { ...s, features: a.features };
    if ('windowSize' in a) return { ...s, windowSize: a.windowSize };
    if ('slidingStep' in a) return { ...s, slidingStep: a.slidingStep };

    throw new Error('invalid action');
};

const getInitialState = (): State => ({
    features: [],
    hyperparameters: {}
});

const mapParamsToClassifierHyperparameterState = (params: TrainingParameters, classifier: string) => {
    const hp = params.classifierOptions[classifier].hyperparameters;
    const obj: Record<string, number | string> = {};
    for (const [k, v] of Object.entries(hp)) {
        switch (v.type) {
        case HyperparameterType.Constant: obj[k] = v.value; break; // backend guys need constants too apparently
        case HyperparameterType.Integer: obj[k] = v.default; break;
        case HyperparameterType.Double: obj[k] = v.default; break;
        case HyperparameterType.Select: obj[k] = v.default.toString(); break;
        }
    };
    return obj;
};

const useModelOptions = (workspaceId: string): ModelOptionsProps => {
    useAuth();
    useHeader({ workspaceId, dangle: 'Create new model' });
    const api = useAPI();
    const [state, dispatch] = useReducer(reducer, getInitialState());
    const [name, onNameChange] = useState('New Model');
    const [didSendRequestCorrectly, setSentCorrectly, clearSentCorrectly] = useBoolean(false);
    const paramsPH = usePromise(async () => {
        const params = await api.getAvailableTrainingParameters();
        const selectNormalizer = (n: string) => dispatch({ normalizer: n });
        const setWindowSize = (n: number) => dispatch({ windowSize: n });
        const setSlidingStep = (n: number) => dispatch({ slidingStep: n });
        const selectImputer = (n: string) => dispatch({ imputation: n });
        const selectFeatures = (n: string[]) => dispatch({ features: n });
        const selectClassifier = (n: string) => dispatch({
            classifier: n,
            hyperparameters: mapParamsToClassifierHyperparameterState(params, n),
            windowSize: params.windowSize,
            slidingStep: params.slidingStep
        });
        const setHyperparameter = (h: string, v: number | string) => dispatch({ type: ActionType.Hyperparameter, parameter: h, value: v });
        
        // We need to provide initial state for select type hyperparameters and comboboxes, since they don't have an unset state
        const newState = getInitialState();
        newState.classifier = params.classifiers[0];
        newState.imputation = params.imputers[0];
        newState.normalizer = params.normalizers[0];
        newState.hyperparameters = mapParamsToClassifierHyperparameterState(params, newState.classifier);
        dispatch({ type: ActionType.Override, state: newState });

        return { params, actions: {
            selectNormalizer,
            selectImputer,
            selectFeatures,
            selectClassifier,
            setHyperparameter,
            setWindowSize,
            setSlidingStep
        } };
    }, []);

    const isValid = () => {
        const { slidingStep, windowSize, imputation, normalizer, classifier} = state;
        if (typeof slidingStep === 'undefined'
            || typeof windowSize === 'undefined'
            || typeof imputation === 'undefined'
            || typeof normalizer === 'undefined'
            || typeof classifier === 'undefined') {
            return false;
        }
        return true;
    };

    const onTrain = async () => {
        const { slidingStep, windowSize, imputation, normalizer, hyperparameters, features, classifier} = state;
        clearSentCorrectly();
        if (!isValid()) return;
        assert(slidingStep !== undefined && imputation !== undefined && normalizer !== undefined && classifier !== undefined && windowSize !== undefined );

        await api.train(workspaceId, {
            modelName: name,
            slidingStep,
            imputation,
            normalizer,
            features,
            hyperparameters,
            classifier,
            windowSize
        });

        // train didn't return any errors from management, we assume that everything is fine and the request has been placed
        setSentCorrectly();
    };

    const onName = (name: string) => {
        clearSentCorrectly();
        onNameChange(name);
    };

    const sensorsAndComponents: [string, string][] = [
        ['Acc', 'x'],
        ['Acc', 'y'],
        ['fgdf', 'x'],
        ['fgdf', 'y']
    ];

    return { state, paramsPH, name, onName, onTrain, isValid: isValid(), didSendRequestCorrectly, sensorsAndComponents };
};

export default useModelOptions;
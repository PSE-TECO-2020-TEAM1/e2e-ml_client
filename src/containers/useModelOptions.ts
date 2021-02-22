import { ModelOptionsProps } from 'components/ModelOptions';
import { HyperparameterType, TrainingParameters } from 'lib/API/DesktopAPI';
import { useAPI, usePromise } from 'lib/hooks';
import { useReducer, useState } from 'react';

type State = {
    normalizer?: string,
    imputer?: string,
    features: string[],
    classifier?: string,
    hyperparameters: Record<string, number | string>
};
enum ActionType {
    AddFeature,
    RemoveFeature,
    Hyperparameter
}
type Action =
    { normalizer: string }
    | { imputer: string }
    | { features: string[] }
    | { classifier: string, hyperparameters: Record<string, number | string> }
    | { type: ActionType.Hyperparameter, parameter: string, value: number | string }
    

const reducer = (s: State, a: Action): State => {
    if ('normalizer' in a) return { ...s, normalizer: a.normalizer };
    if ('imputer' in a) return { ...s, imputer: a.imputer };
    if ('classifier' in a) return { ...s, classifier: a.classifier, hyperparameters: a.hyperparameters };
    if ('features' in a) return { ...s, features: a.features };
    if (a.type === ActionType.Hyperparameter) return { ...s, hyperparameters: { ...s.hyperparameters, [a.parameter]: a.value } };

    throw new Error('invalid action');
};

const getInitialState = () => ({
    features: [],
    hyperparameters: {}
});

const mapParamsToClassifierHyperparameterState = (params: TrainingParameters, classifier: string) => {
    const hp = params.classifierOptions[classifier].hyperparameters;
    const obj: Record<string, number | string> = {};
    for (const [k, v] of Object.entries(hp)) {
        switch (v.type) {
        case HyperparameterType.Constant: break; // no state for constant values
        case HyperparameterType.Integer: obj[k] = v.default; break;
        case HyperparameterType.Double: obj[k] = v.default; break;
        case HyperparameterType.Select: obj[k] = v.default; break;
        }
    };
    return obj;
};

const useModelOptions = (workspaceId: string): ModelOptionsProps => {
    const api = useAPI();
    const [state, dispatch] = useReducer(reducer, getInitialState());
    const [name, onName] = useState('New Model');
    const paramsPH = usePromise(async () => {
        const params = await api.getAvailableTrainingParameters();
        const selectNormalizer = (n: string) => dispatch({ normalizer: n });
        const selectImputer = (n: string) => dispatch({ imputer: n });
        const selectFeatures = (n: string[]) => dispatch({ features: n });
        const selectClassifier = (n: string) => dispatch({ classifier: n, hyperparameters: mapParamsToClassifierHyperparameterState(params, n) });
        const setHyperparameter = (h: string, v: number | string) => dispatch({ type: ActionType.Hyperparameter, parameter: h, value: v });
        
        return { params, actions: {
            selectNormalizer,
            selectImputer,
            selectFeatures,
            selectClassifier,
            setHyperparameter,
        } };
    }, []);

    const onTrain = () => {}; // FIXME implement

    return { state, paramsPH, name, onName, onTrain };
};

export default useModelOptions;
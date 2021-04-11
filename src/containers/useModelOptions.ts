import { ModelOptionsProps } from 'components/ModelOptions';
import { HyperparameterType, TrainingParameters } from 'lib/API/DesktopAPI';
import assert from 'lib/assert';
import { useAPI, useAuth, useBoolean, usePromise } from 'lib/hooks';
import { useHeader } from 'lib/hooks/Header';
import { getSensorTree, sensorComponents } from 'lib/sensors';
import { useReducer, useState } from 'react';
import pick from 'object.pick';

type State = {
    normalizer: Record<string, Record<string, string>>,
    imputation: Record<string, Record<string, string>>,
    features: Record<string, Record<string, string[]>>,
    classifier: string,
    hyperparameters: Record<string, number | string>,
    windowSize: number,
    slidingStep: number,
} | undefined;
enum ActionType {
    Hyperparameter,
    Override
}
type Action =
    { normalizer: string, sensor: string, component: string }
    | { imputation: string, sensor: string, component: string }
    | { features: string[], sensor: string, component: string }
    | { slidingStep: number }
    | { windowSize: number }
    | { classifier: string, hyperparameters: Record<string, number | string>, windowSize: number, slidingStep: number }
    | { type: ActionType.Hyperparameter, parameter: string, value: number | string }
    | { type: ActionType.Override, state: State };
    

const reducer = (s: State, a: Action): State => {
    if ('type' in a) {
        switch(a.type) {
        case ActionType.Hyperparameter:
            assert(typeof s !== 'undefined');
            return { ...s, hyperparameters: { ...s.hyperparameters, [a.parameter]: a.value } };
        case ActionType.Override:
            return a.state;
        }
    }

    assert(typeof s !== 'undefined');
    if ('classifier' in a) return { ...s, classifier: a.classifier, hyperparameters: a.hyperparameters, windowSize: a.windowSize, slidingStep: a.slidingStep };
    if ('normalizer' in a) return { ...s, normalizer: {...s.normalizer, [a.sensor]: {...s.normalizer[a.sensor], [a.component]: a.normalizer}} };
    if ('imputation' in a) return { ...s, imputation: {...s.imputation, [a.sensor]: {...s.imputation[a.sensor], [a.component]: a.imputation}} };
    if ('features' in a) return { ...s, features: {...s.features, [a.sensor]: {...s.features[a.sensor], [a.component]: a.features}} };

    if ('windowSize' in a) return { ...s, windowSize: a.windowSize };
    if ('slidingStep' in a) return { ...s, slidingStep: a.slidingStep };

    throw new Error('invalid action');
};

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
    const [state, dispatch] = useReducer(reducer, undefined as State);
    const [name, onNameChange] = useState('New Model');
    const [didSendRequestCorrectly, setSentCorrectly, clearSentCorrectly] = useBoolean(false);
    const paramsPH = usePromise(async () => {
        const params = await api.getAvailableTrainingParameters();
        const availableSensors = await api.getWorkspaceSensors(workspaceId);
        const selectNormalizer = (sensor: string, component: string, n: string) => dispatch({ normalizer: n, sensor, component });
        const selectImputer = (sensor: string, component: string, n: string) => dispatch({ imputation: n, sensor, component });
        const selectFeatures = (sensor: string, component: string, n: string[]) => dispatch({ features: n, sensor, component });

        const setWindowSize = (n: number) => dispatch({ windowSize: n });
        const setSlidingStep = (n: number) => dispatch({ slidingStep: n });
        const selectClassifier = (n: string) => dispatch({
            classifier: n,
            hyperparameters: mapParamsToClassifierHyperparameterState(params, n),
            windowSize: params.windowSize,
            slidingStep: params.slidingStep
        });
        const setHyperparameter = (h: string, v: number | string) => dispatch({ type: ActionType.Hyperparameter, parameter: h, value: v });
        
        // We need to provide initial state for select type hyperparameters and comboboxes, since they don't have an unset state
        const newState: State = {
            classifier: params.classifiers[0],
            hyperparameters: mapParamsToClassifierHyperparameterState(params, params.classifiers[0]),

            imputation: pick(getSensorTree(params.imputers[0]), availableSensors.map(({ name }) => name)),
            normalizer: pick(getSensorTree(params.normalizers[0]), availableSensors.map(({ name }) => name)),
            features: pick(getSensorTree(params.features), availableSensors.map(({ name }) => name)),

            windowSize: 10,
            slidingStep: 5,
        };
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

    const sensorsAndComponentsPH = usePromise(async () => {
        const availableSensors = await api.getWorkspaceSensors(workspaceId);
        const sensorsAndComponents: [string, readonly string[]][] = availableSensors.map(({ name }) => [name, sensorComponents[name]]);

        return sensorsAndComponents;
    }, []);

    const isValid = () => {
        if (typeof state === 'undefined') return false;
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
        if (!isValid()) return;
        if (typeof state === 'undefined') return;
        const { slidingStep, windowSize, imputation, normalizer, hyperparameters, features, classifier} = state;
        clearSentCorrectly();
        assert(slidingStep !== undefined && imputation !== undefined && normalizer !== undefined && classifier !== undefined && windowSize !== undefined );

        assert(typeof sensorsAndComponentsPH[1] !== 'undefined');
        const sensorsAndComponents = sensorsAndComponentsPH[1];
        const perComponentConfigs = sensorsAndComponents.flatMap(([name, comps]) => comps.map(comp => ({
            sensor: name,
            component: comp,
            normalizer: normalizer[name][comp],
            imputation: imputation[name][comp],
            features: features[name][comp],
        })));

        await api.train(workspaceId, {
            modelName: name,
            slidingStep,
            hyperparameters,
            classifier,
            windowSize,
            perComponentConfigs
        });

        // train didn't return any errors from management, we assume that everything is fine and the request has been placed
        setSentCorrectly();
    };

    const onName = (name: string) => {
        clearSentCorrectly();
        onNameChange(name);
    };

    return { state, paramsPH, name, onName, onTrain, isValid: isValid(), didSendRequestCorrectly, sensorsAndComponentsPH };
};

export default useModelOptions;
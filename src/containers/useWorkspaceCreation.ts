import { WorkspaceCreationProps, WorkspaceCreationSensorAttrs } from 'components/WorkspaceCreation';
import { ISensor } from 'lib/API';
import sensors, { SensorName } from 'lib/sensors';
import { useCallback, useReducer, useState } from 'react';

type State = WorkspaceCreationSensorAttrs;
type Action = {name: string, sel: boolean } | { name: string, rat: string };
const initialSensors = () => sensors.reduce((agg: State, cur) => {
    agg[cur.name] = {
        selected: false,
        rate: cur.defaultSamplingRate,
        rateValid: true
    };
    return agg;
}, {});

const reduceSensors = (state: State, action: Action): State => {
    if ('sel' in action) return {...state, [action.name]: {...state[action.name], selected: action.sel }};
    if ('rat' in action) return {...state, [action.name]: {
        ...state[action.name], rate: parseInt(action.rat), rateValid: parseInt(action.rat) <= sensors.find(v => v.name === action.name)!.maxSamplingRate
    }};
    throw new Error('undefined action');
};

const areRatesValid = (state: State) => {
    for (const { rateValid } of Object.values(state)) {
        if (!rateValid) return false;
    }
    return true;
};

// const areRatesValid = (state: State) => Object.values(state).reduce((agg, cur) => agg && cur.rateValid, true);

const useWorkspaceCreation = (create: (name: string, sensors: ISensor[]) => Promise<boolean>): WorkspaceCreationProps => {
    const [name, setName] = useState<string>('');
    const [state, dispatch] = useReducer(reduceSensors, undefined, initialSensors);

    const onCreate = useCallback(async () => {
        await create(name, Object.entries(state)
            .filter(v => v[1].selected)
            .map(v => ({ sensorName: v[0] as SensorName, samplingRate: v[1].rate }))
        );
    }, [name, state, create]);

    const onSensorSelect = useCallback((name, sel) => dispatch({ name, sel }), []);
    const onRateSelect = useCallback((name, rat) => dispatch({ name, rat }), []);

    const valid = areRatesValid(state);

    return { onCreate, name, sensorAttrs: state, onRateSelect, onSensorSelect, onName: setName, valid };
};

export default useWorkspaceCreation;
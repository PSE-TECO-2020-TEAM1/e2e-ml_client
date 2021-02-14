import { AttrCollection, WorkspaceCreationProps, WorkspaceCreationSensorAttrs } from 'components/WorkspaceCreation';
import { SensorOptions } from 'lib/API/DesktopAPI';
import { sensorConfigurations, SensorName } from 'lib/sensors';
import { objectMap } from 'lib/utils';
import { useCallback, useReducer, useState } from 'react';

type State = WorkspaceCreationSensorAttrs;
type Action = {name: SensorName, sel: boolean } | { name: SensorName, rat: string };
const initialSensors = () => objectMap(sensorConfigurations, (cur) => ({
    selected: false,
    rate: cur.defaultSamplingRate,
    rateValid: true
}));

const reduceSensors = (state: State, action: Action): State => {
    if ('sel' in action) return {...state, [action.name]: {...state[action.name], selected: action.sel }};
    if ('rat' in action) return {...state, [action.name]: {
        ...state[action.name], rate: parseInt(action.rat), rateValid: parseInt(action.rat) <= sensorConfigurations[action.name].maxSamplingRate
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

const useWorkspaceCreation = (create: (name: string, sensors: SensorOptions[]) => Promise<boolean>): WorkspaceCreationProps => {
    const [name, setName] = useState<string>('');
    const [state, dispatch] = useReducer<(state: State, action: Action) => State, undefined>(reduceSensors, undefined, initialSensors);

    const onCreate = useCallback(async () => {
        // see the comments in WorkspaceCreationView
        await create(name, (Object.entries(state) as [SensorName, AttrCollection][])
            .filter(v => v[1].selected)
            .map(v => ({ sensorName: v[0], samplingRate: v[1].rate }))
        );
    }, [name, state, create]);

    const onSensorSelect = useCallback((name, sel) => dispatch({ name, sel }), []);
    const onRateSelect = useCallback((name, rat) => dispatch({ name, rat }), []);

    const valid = areRatesValid(state);

    return { onCreate, name, sensorAttrs: state, onRateSelect, onSensorSelect, onName: setName, valid };
};

export default useWorkspaceCreation;
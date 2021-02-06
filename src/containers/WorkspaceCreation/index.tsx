import TextField, { TextInput } from 'components/TextField';
import { ISensor } from 'lib/API';
import { useBoolean } from 'lib/hooks';
import sensors, { SamplingRate, SensorName } from 'lib/sensors';
import React, { Fragment, useCallback, useReducer, useState } from 'react';

export interface WorkspaceCreationProps {
    create(name: string, sensors: ISensor[]): Promise<boolean>
}

// string here should've been SensorName, but typescript is cryptic
type State = Record<string, { selected: boolean, rate: SamplingRate, rateValid: boolean }>;
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

const WorkspaceCreation = ({ create } : WorkspaceCreationProps) => {
    const [name, setName] = useState<string>('');
    const [state, dispatch] = useReducer(reduceSensors, undefined, initialSensors);

    const onCreate = useCallback(async () => {
        await create(name, Object.entries(state)
            .filter(v => v[1].selected)
            // state[k: string] as state[k: SensorName] type casted, see the comment above State
            .map(v => ({ sensorName: v[0] as SensorName, samplingRate: v[1].rate }))
        );
    }, [name, state, create]);

    return <Fragment>
        <TextField onType={setName} label="Name" value={name} />
        <label>Choose Sensors:</label>
        <label>Choose sampling rates:</label>
        <ul>
            {sensors.map(({ name, maxSamplingRate }) => <li key={`${name}-name`}>
                <label htmlFor={name}>{name}</label>
                <input type="checkbox" name={name} checked={state[name].selected} onChange={e => dispatch({ name, sel: e.target.checked })} />
                
                {state[name].selected ? <Fragment>
                    <TextInput type="number" value={state[name].rate} onType={e =>  dispatch({ name, rat: e })}/>
                    {!state[name].rateValid ? 'invalid sample rate' : null}
                </Fragment> : null}
            </li>)}
        </ul>
        <button disabled={!(areRatesValid(state))} onClick={onCreate} >create</button>
    </Fragment>;
};

export default WorkspaceCreation;
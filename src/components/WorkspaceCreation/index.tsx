import TextField, { TextInput } from 'components/TextField';
import React from 'react';

export type WorkspaceCreationSensorAttrs = Record<string, { selected: boolean, rate: number, rateValid: boolean }>
export type WorkspaceCreationProps = {
    onCreate(): void | Promise<void>,
    onName(name: string): void,
    onSensorSelect(name: string, selected: boolean): void,
    onRateSelect(name: string, rate: string): void,
    name: string,
    valid: boolean,
    sensorAttrs: WorkspaceCreationSensorAttrs
};

const WorkspaceCreation = ({ onCreate, name, onName, onSensorSelect, onRateSelect, valid, sensorAttrs } : WorkspaceCreationProps) => {
    return <>
        <TextField onType={onName} label="Name" value={name} />
        <label>Choose Sensors:</label>
        <label>Choose sampling rates:</label>
        <ul>
            {Object.keys(sensorAttrs).map((name) => <li key={`${name}-name`}>
                <label htmlFor={name}>{name}</label>
                <input type="checkbox" name={name} checked={sensorAttrs[name].selected} onChange={e => onSensorSelect(name, e.target.checked)} />
                
                {sensorAttrs[name].selected ? <>
                    <TextInput type="number" value={sensorAttrs[name].rate} onType={e => onRateSelect(name, e)}/>
                    {!sensorAttrs[name].rateValid ? 'invalid sample rate' : null}
                </> : null}
            </li>)}
        </ul>
        <button disabled={!valid} onClick={onCreate} >create</button>
    </>;
};

export default WorkspaceCreation;
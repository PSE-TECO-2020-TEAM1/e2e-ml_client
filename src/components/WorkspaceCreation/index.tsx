import TextField, { TextInput } from 'components/TextField';
import { SensorName } from 'lib/sensors';
import React from 'react';

export type AttrCollection = { selected: boolean, rate: number, rateValid: boolean };
// can't make the following a Record<SensorName ...> record without convoluting the file a lot (100+ lines just for that) 
export type WorkspaceCreationSensorAttrs = Record<string, AttrCollection>
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
            {/* Object.keys doesn't preserve type: https://github.com/microsoft/TypeScript/pull/12253 */}
            {/* see above too */}
            {(Object.keys(sensorAttrs) as Array<SensorName>).map((sensorName) => <li key={`${sensorName}-sensorName`}>
                <label htmlFor={sensorName}>{sensorName}</label>
                <input type="checkbox" name={sensorName} checked={sensorAttrs[sensorName].selected} onChange={e => onSensorSelect(sensorName, e.target.checked)} />
                
                {sensorAttrs[sensorName].selected ? <>
                    <TextInput type="number" value={sensorAttrs[sensorName].rate} onType={e => onRateSelect(sensorName, e)}/>
                    {!sensorAttrs[sensorName].rateValid ? 'invalid sample rate' : null}
                </> : null}
            </li>)}
        </ul>
        <button disabled={!valid} onClick={onCreate} >create</button>
    </>;
};

export default WorkspaceCreation;
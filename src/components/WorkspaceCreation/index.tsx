import { TextInput, Heading, Checkbox, Pane, majorScale, Button, TextInputField } from 'evergreen-ui';
import { SensorName } from 'lib/sensors';
import { ETV } from 'lib/utils';
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
    sensorAttrs: WorkspaceCreationSensorAttrs,
    onClose?: () => void
};

const WorkspaceCreation = ({ onCreate, name, onName, onSensorSelect, onRateSelect, valid, sensorAttrs, onClose = () => {} } : WorkspaceCreationProps) => {
    return <Pane display="flex" flexDirection="column" gap={majorScale(2)}>
        <TextInput width="100%" onChange={(e: ETV<string>) => onName(e.target.value)} placeholder="Name" value={name} />
        <Heading>Choose sensors and sample rates</Heading>
        {/* Object.keys doesn't preserve type: https://github.com/microsoft/TypeScript/pull/12253 */}
        {/* see above too */}
        {(Object.keys(sensorAttrs) as Array<SensorName>).map((sensorName) => <Pane height={majorScale(3)} display="flex" alignItems="center" key={`${sensorName}-sensorName`}>
            <Checkbox flex="1" checked={sensorAttrs[sensorName].selected} label={sensorName} onChange={e => onSensorSelect(sensorName, e.target.checked)}/>
            
            {sensorAttrs[sensorName].selected ? <>
                <TextInputField type="number" value={sensorAttrs[sensorName].rate} onChange={(e: ETV<string>) => onRateSelect(sensorName, e.target.value)}
                    isInvalid={!sensorAttrs[sensorName].rateValid}
                    // validationMessage="invalid sample rate"
                />
            </> : null}
        </Pane>)}
        <Pane display="flex" flexDirection="row-reverse">
            <Button disabled={!valid} onClick={() => [onCreate(), onClose()]} >Create</Button> {/* just to invode them both */}
        </Pane>
    </Pane>;
};

export default WorkspaceCreation;
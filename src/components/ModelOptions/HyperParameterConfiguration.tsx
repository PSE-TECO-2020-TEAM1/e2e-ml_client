import { RadioGroup, TextInputField, Pane, majorScale, Label, Text } from 'evergreen-ui';
import { HyperparameterType } from 'lib/API/DesktopAPI';
import { Promised } from 'lib/hooks/Promise';
import { ETV } from 'lib/utils';
import React from 'react';
import { format, ParamsType, State } from '.';

type HyperparameterConfigurationType = {
    paramsPH: ParamsType,
    state: State,
}

const nMB = { marginBottom: 0 };

export const HyperparameterConfiguration = ({ paramsPH, state }: HyperparameterConfigurationType) =>
    <Promised promise={paramsPH} pending={'loading...'}>{({ params: { classifierOptions } , actions: { setHyperparameter, setSlidingStep, setWindowSize } }) => {
        if (typeof state.classifier === 'undefined') return null;
        const opt = classifierOptions[state.classifier];

        return <Pane display="flex" flexDirection="column" gap={majorScale(1)}>
            <Pane>
                <Label>Conditions: </Label>
                {opt.conditions.map(c => <Text display="block">{c}</Text>)}
            </Pane>
            <TextInputField {...nMB} label="Window Size" onChange={(e: ETV<string>) => setWindowSize(parseInt(e.target.value))} type="number" step={1} value={state.windowsSize}/>
            <TextInputField {...nMB} label="Sliding Step" onChange={(e: ETV<string>) => setSlidingStep(parseInt(e.target.value))} type="number" step={1} value={state.slidingStep} />
            <Pane display="flex" flexDirection="column" gap={majorScale(1)}>
                {Object.entries(opt.hyperparameters).map(([k, v]) => {
                    switch (v.type) {
                    case HyperparameterType.Constant: return <Pane>
                        <Text><Label>{format(k)}</Label>: {v.value}</Text>
                    </Pane>;
                    case HyperparameterType.Integer: return <div>
                        <TextInputField {...nMB} label={format(k)} onChange={(e: ETV<string>) => setHyperparameter(k, parseInt(e.target.value))} type="number" step={1} min={v.lower} max={v.upper} value={state.hyperparameters[k]}/>
                    </div>;
                    case HyperparameterType.Double: return <div>
                        <TextInputField {...nMB} label={format(k)} onChange={(e: ETV<string>) => setHyperparameter(k, parseFloat(e.target.value))} type="number" min={v.lower} max={v.upper} value={state.hyperparameters[k]}/>
                    </div>;
                    case HyperparameterType.Select: return <div>
                        <RadioGroup
                            label={format(k)}
                            value={state.hyperparameters[k].toString()}
                            options={v.choices.map(q => ({ value: q.toString(), label: format(q.toString()) }))}
                            onChange={(e: ETV<string>) => setHyperparameter(k, e.target.value)}
                        />
                    </div>;
                    }

                    // unreachable, leave in place to suppress eslint
                    throw new Error('unexpected hyperparameter type');
                })}
            </Pane>
        </Pane>;
    }}</Promised>;
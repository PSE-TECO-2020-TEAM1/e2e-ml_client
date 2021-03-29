import { RadioGroup, TextInputField, Pane, Heading, majorScale, Button, Checkbox, Label, Text, InlineAlert } from 'evergreen-ui';
import { HyperparameterType, TrainingParameters } from 'lib/API/DesktopAPI';
import { Promised, PromisePack } from 'lib/hooks/Promise';
import { ETV } from 'lib/utils';
import React from 'react';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';

export type ModelOptionsProps = {
    paramsPH: PromisePack<{
        params: TrainingParameters;
        actions: {
            selectNormalizer: (n: string) => void;
            selectImputer: (n: string) => void;
            setWindowSize: (n: number) => void;
            setSlidingStep: (n: number) => void;
            selectFeatures: (n: string[]) => void;
            selectClassifier: (n: string) => void;
            setHyperparameter: (h: string, v: number | string) => void;
        };
    }>,
    state: {
        normalizer?: string,
        imputation?: string,
        features: string[],
        classifier?: string,
        hyperparameters: Record<string, number | string>,
        slidingStep?: number,
        windowsSize?: number
    };
    name: string,
    onName: (n: string) => void
    onTrain: () => void,
    isValid: boolean,
    didSendRequestCorrectly: boolean,
};

const handleCheckbox = (x: string, l: string[], b: boolean) => {
    const ret = l.filter(q => q !== x);
    if (b) ret.push(x);
    return ret;
};

const nMB = { marginBottom: 0 };

const format = (x: string) => x.split('_').map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()).join(' ');
const mapRGroup = (x: string) => ({ value: x, label: format(x) });
const ModelOptions = ({ paramsPH, state, name, onName, onTrain, isValid, didSendRequestCorrectly }: ModelOptionsProps) => {
    return <Pane padding={majorScale(2)} display="flex" flexDirection="column" gap={majorScale(2)}>
        <TextInputField {...nMB} onChange={(e: ETV<string>) => onName(e.target.value)} label="Name" value={name} />
        <Accordion allowMultipleExpanded allowZeroExpanded>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        <Pane borderBottom="muted" padding={majorScale(2)}>
                            <Heading>Imputation</Heading>
                        </Pane>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel><div>
                    <Promised promise={paramsPH} pending={'loading...'}>{({ params: { imputers }, actions: { selectImputer } }) =>
                        <RadioGroup
                            value={state.imputation}
                            options={imputers.map(mapRGroup)}
                            onChange={(e: ETV<string>) => selectImputer(e.target.value)}
                        />
                    }</Promised>
                </div></AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        <Pane borderBottom="muted" padding={majorScale(2)}>
                            <Heading>Features</Heading>
                        </Pane>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel><div>
                    <Promised promise={paramsPH} pending={'loading...'}>{({ params: { features }, actions: { selectFeatures } }) =>
                        <Pane>
                            {features.map(f =>
                                <Checkbox
                                    checked={state.features.includes(f)}
                                    label={format(f)}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => selectFeatures(handleCheckbox(f, state.features, e.target.checked))}
                                ></Checkbox>
                            )}
                        </Pane>
                    }</Promised>
                </div></AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        <Pane borderBottom="muted" padding={majorScale(2)}>
                            <Heading>Normalizer</Heading>
                        </Pane>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel><div>
                    <Promised promise={paramsPH} pending={'loading...'}>{({ params: { normalizers }, actions: { selectNormalizer } }) =>
                        <RadioGroup
                            value={state.normalizer}
                            options={normalizers.map(mapRGroup)}
                            onChange={(e: ETV<string>) => selectNormalizer(e.target.value)}
                        />
                    }</Promised>
                </div></AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        <Pane borderBottom="muted" padding={majorScale(2)}>
                            <Heading>Classifier</Heading>
                        </Pane>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel><div>
                    <Promised promise={paramsPH} pending={'loading...'}>{({ params: { classifiers }, actions: { selectClassifier } }) =>
                        <RadioGroup
                            value={state.classifier}
                            options={classifiers.map(mapRGroup)}
                            onChange={(e: ETV<string>) => selectClassifier(e.target.value)}
                        />
                    }</Promised>
                </div></AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        <Pane padding={majorScale(2)}>
                            <Heading>Hyperparameters</Heading>
                        </Pane>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel><div>
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
                    }}</Promised>
                </div></AccordionItemPanel>
            </AccordionItem>
        </Accordion>
        <Button disabled={!isValid} alignSelf="flex-end" appearance="primary" onClick={onTrain}>Train</Button>
        {didSendRequestCorrectly ? <InlineAlert intent="success">Training request has been sent and accepted!</InlineAlert> : null}
    </Pane>;
};

export default ModelOptions;
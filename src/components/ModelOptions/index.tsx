import TextField, { TextInput } from 'components/TextField';
import { HyperparameterType, TrainingParameters } from 'lib/API/DesktopAPI';
import { Promised, PromisePack } from 'lib/hooks/Promise';
import React from 'react';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import { RadioGroup, Radio } from 'react-radio-group';
import CheckboxGroup from 'react-checkbox-group';

import styles from './index.module.scss';
const { main, hyperparameters, conditions, accHeading, panel, radioGroup, hyper, train } = styles;

export type ModelOptionsProps = {
    paramsPH: PromisePack<{
        params: TrainingParameters;
        actions: {
            selectNormalizer: (n: string) => void;
            selectImputer: (n: string) => void;
            selectFeatures: (n: string[]) => void;
            selectClassifier: (n: string) => void;
            setHyperparameter: (h: string, v: number | string) => void;
        };
    }>,
    state: {
        normalizer?: string,
        imputer?: string,
        features: string[],
        classifier?: string,
        hyperparameters: Record<string, number | string>
    };
    name: string,
    onName: (n: string) => void
    onTrain: () => void
};

const format = (x: string) => x.split('_').map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()).join(' ');

const ModelOptions = ({ paramsPH, state, name, onName, onTrain }: ModelOptionsProps) => {
    console.log(paramsPH, state);
    return <section className={main}>
        <TextField onType={onName} label="Name" value={name} />
        <Accordion allowMultipleExpanded allowZeroExpanded>
            <AccordionItem>
                <AccordionItemHeading className={accHeading}>
                    <AccordionItemButton>
                        Imputation
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel><div className={panel}>
                    <Promised promise={paramsPH} pending={'loading...'}>{({ params: { imputers }, actions: { selectImputer } }) =>
                        <RadioGroup className={radioGroup} name="imputer" selectedValue={state.imputer} onChange={selectImputer}>
                            {imputers.map(imp => <label key={imp}>
                                <Radio value={imp}/> {format(imp)}
                            </label>)}
                        </RadioGroup>
                    }</Promised>
                </div></AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading className={accHeading}>
                    <AccordionItemButton>
                        Features
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel><div className={panel}>
                    <Promised promise={paramsPH} pending={'loading...'}>{({ params: { features }, actions: { selectFeatures } }) =>
                        <CheckboxGroup name="features" value={state.features} onChange={selectFeatures}>
                            {(Checkbox) => <>
                                {features.map(f => <label key={f}>
                                    <Checkbox value={f} /> {format(f)}
                                </label>)}
                            </>}
                        </CheckboxGroup>
                    }</Promised>
                </div></AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading className={accHeading}>
                    <AccordionItemButton>
                        Normalizer
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel><div className={panel}>
                    <Promised promise={paramsPH} pending={'loading...'}>{({ params: { normalizers }, actions: { selectNormalizer } }) =>
                        <RadioGroup className={radioGroup} name="normalizer" selectedValue={state.normalizer} onChange={selectNormalizer}>
                            {normalizers.map(nor => <label key={nor}>
                                <Radio value={nor}/> {format(nor)}
                            </label>)}
                        </RadioGroup>
                    }</Promised>
                </div></AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading className={accHeading}>
                    <AccordionItemButton>
                        Classifier
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel><div className={panel}>
                    <Promised promise={paramsPH} pending={'loading...'}>{({ params: { classifiers }, actions: { selectClassifier } }) =>
                        <RadioGroup className={radioGroup} name="classifier" selectedValue={state.classifier} onChange={selectClassifier}>
                            {classifiers.map(cl => <label key={cl}>
                                <Radio value={cl}/> {format(cl)}
                            </label>)}
                        </RadioGroup>
                    }</Promised>
                </div></AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading className={accHeading}>
                    <AccordionItemButton>
                        Hyperparameters
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel><div className={panel}>
                    <Promised promise={paramsPH} pending={'loading...'}>{({ params: { classifierOptions } , actions: { setHyperparameter } }) => {
                        if (typeof state.classifier === 'undefined') return null;
                        const opt = classifierOptions[state.classifier];
                        console.log(opt);

                        return <>
                            <div className={conditions}>
                                <em>Conditions: </em>
                                {opt.conditions.map(c => <span>{c}</span>)}
                            </div>
                            <div className={hyperparameters}>
                                {Object.entries(opt.hyperparameters).map(([k, v]) => {
                                    switch (v.type) {
                                    case HyperparameterType.Constant: return <div className={hyper}>
                                        <span>{k}: {v.value}</span>
                                    </div>;
                                    case HyperparameterType.Integer: return <div className={hyper}>
                                        <span>{k}</span>
                                        <TextInput type="number" step={1} min={v.lower} max={v.upper} value={state.hyperparameters[k]} onType={s => setHyperparameter(k, s)}/>
                                    </div>;
                                    case HyperparameterType.Double: return <div className={hyper}>
                                        <span>{k}</span>
                                        <TextInput type="number" min={v.lower} max={v.upper} value={state.hyperparameters[k]} onType={s => setHyperparameter(k, s)}/>
                                    </div>;
                                    case HyperparameterType.Select: return <div className={hyper}>
                                        <span>{k}</span>
                                        <RadioGroup className={radioGroup} name={k} selectedValue={state.hyperparameters[k]} onChange={e => setHyperparameter(k, e)}>
                                            {v.choices.map(ch => <label key={ch}>
                                                <Radio value={ch}/> {format(ch)}
                                            </label>)}
                                        </RadioGroup>
                                    </div>;
                                    }

                                    // unreachable, leave in place to suppress eslint
                                    throw new Error('unexpected hyperparameter type');
                                })}
                            </div>
                        </>;
                    }}</Promised>
                </div></AccordionItemPanel>
            </AccordionItem>
        </Accordion>
        <button className={train} onClick={onTrain}>Train</button>       
    </section>;
};

export default ModelOptions;
import { RadioGroup, Pane, Label, majorScale, Checkbox } from 'evergreen-ui';
import { Promised  } from 'lib/hooks/Promise';
import { ETV } from 'lib/utils';
import React from 'react';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import { format, ParamsType, State, mapRGroup } from '.';

type ComponentProps = {
    paramsPH: ParamsType,
    state: State,
    sensor: string,
    component: string,
}

const handleCheckbox = (x: string, l: string[], b: boolean) => {
    const ret = l.filter(q => q !== x);
    if (b) ret.push(x);
    return ret;
};

const Accord = ({ header, children }: { header: string, children: React.ReactNode }) =>
    <AccordionItem>
        <AccordionItemHeading>
            <AccordionItemButton>
                <Pane borderBottom="muted" padding={majorScale(2)}>
                    <Label>{header}</Label>
                </Pane>
            </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel><Pane paddingLeft={majorScale(2)} paddingRight={majorScale(2)} paddingBottom={majorScale(1)}>
            {children}
        </Pane></AccordionItemPanel>
    </AccordionItem>;

export const Component = ({ paramsPH, state, sensor, component }: ComponentProps) =>
    <Accordion allowMultipleExpanded allowZeroExpanded>
        <Accord header="Imputation">
            <Promised promise={paramsPH} pending={'loading...'}>{({ params: { imputers }, actions: { selectImputer } }) =>
                <RadioGroup
                    value={state.imputation[sensor][component]}
                    options={imputers.map(mapRGroup)}
                    onChange={(e: ETV<string>) => selectImputer(sensor, component, e.target.value)}
                />
            }</Promised>
        </Accord>
        <Accord header="Features">
            <Promised promise={paramsPH} pending={'loading...'}>{({ params: { features }, actions: { selectFeatures } }) =>
                <Pane>
                    {features.map(f =>
                        <Checkbox
                            checked={state.features[sensor][component].includes(f)}
                            label={format(f)}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => selectFeatures(sensor, component, handleCheckbox(f, state.features[sensor][component], e.target.checked))}
                        ></Checkbox>
                    )}
                </Pane>
            }</Promised>
        </Accord>
        <Accord header="Normalizer">
            <Promised promise={paramsPH} pending={'loading...'}>{({ params: { normalizers }, actions: { selectNormalizer } }) =>
                <RadioGroup
                    value={state.normalizer[sensor][component]}
                    options={normalizers.map(mapRGroup)}
                    onChange={(e: ETV<string>) => selectNormalizer(sensor, component, e.target.value)}
                />
            }</Promised>
        </Accord>
    </Accordion>;
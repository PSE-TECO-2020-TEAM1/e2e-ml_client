import { RadioGroup, Pane, Heading, majorScale, Checkbox } from 'evergreen-ui';
import { Promised  } from 'lib/hooks/Promise';
import { ETV } from 'lib/utils';
import React from 'react';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import { format, ParamsType, State, mapRGroup } from '.';

type ComponentProps = {
    paramsPH: ParamsType,
    state: State,
}

const handleCheckbox = (x: string, l: string[], b: boolean) => {
    const ret = l.filter(q => q !== x);
    if (b) ret.push(x);
    return ret;
};

export const Component = ({ paramsPH, state }: ComponentProps) =>
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
    </Accordion>;
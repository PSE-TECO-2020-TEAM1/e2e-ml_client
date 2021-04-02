import React from 'react';
import ReactDOM from 'react-dom';
import ModelOptions from 'components/ModelOptions';
import { State, Promised, PromisePack } from 'lib/hooks/Promise';
import { HyperparameterType, TrainingParameters } from 'lib/API/DesktopAPI';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

const noop = (n: string) => {};
const noop2 = (n: number) => {};
const noop1 = (h: string, v: number | string) => {};
const noop3 = (n: string[]) => {};
const noop4 = () => {};
interface ClassifierOptions {
    hyperparameters: Record<string, Hyperparameter>;
    conditions: string[];
}
type Hyperparameter = {
    type: number;
    lower: number;
    upper: number;
    default: number;
};
let hyperpara: {
    type: number;
    lower: number;
    upper: number;
    default: number;
} = { type: 1, lower: 1, upper: 2, default: 1 };

let hypa: Record<string, Hyperparameter> = {
    hyperparameter: hyperpara,
};
let classifieropt: {
    hyperparameters: Record<string, Hyperparameter>;
    conditions: string[];
} = { hyperparameters: hypa, conditions: ['condition1', 'condition2'] };

let co: Record<string, ClassifierOptions> = {
    cop: classifieropt,
};
let tab2: TrainingParameters = {
    features: ['feature', 'feature'],
    imputers: ['imputer', 'imputer'],
    normalizers: ['normalizer', 'normalizer'],
    classifiers: ['classifier', 'classifier'],
    classifierOptions: co,
    windowSize: 5,
    slidingStep: 10,
};
let acti: {
    selectNormalizer: (n: string) => void;
    selectImputer: (n: string) => void;
    setWindowSize: (n: number) => void;
    setSlidingStep: (n: number) => void;
    selectFeatures: (n: string[]) => void;
    selectClassifier: (n: string) => void;
    setHyperparameter: (h: string, v: number | string) => void;
} = {
    selectNormalizer: noop,
    selectImputer: noop,
    setWindowSize: noop2,
    setSlidingStep: noop2,
    selectFeatures: noop3,
    selectClassifier: noop,
    setHyperparameter: noop1,
};
let tab1: {
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
} = { params: tab2, actions: acti };
let tab: PromisePack<{
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
}> = [State.Pending, tab1, Error];
let hypar: Record<string, number> = {
    hyper: 5,
};
let sta: {
    features: string[];
    hyperparameters: Record<string, number | string>;
} = { features: ['feature', 'feature'], hyperparameters: hypar };
describe('ModelOptions', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <ModelOptions
                paramsPH={tab}
                state={sta}
                name={'name'}
                onName={noop}
                onTrain={noop4}
                isValid={true}
            />,
            div
        );
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(
                <ModelOptions
                    paramsPH={tab}
                    state={sta}
                    name={'name'}
                    onName={noop}
                    onTrain={noop4}
                    isValid={true}
                />,
                div
            );
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(`
            "<div class=\\"css-nil ub-pb_16px ub-pl_16px ub-pr_16px ub-pt_16px ub-dspl_flex ub-flx-drct_column ub-gap_16px ub-box-szg_border-box\\">
              <div class=\\"ub-mb_0px ub-box-szg_border-box\\"><label class=\\"ub-color_425A70 ub-fnt-fam_b77syt ub-fnt-sze_14px ub-f-wght_500 ub-ln-ht_20px ub-ltr-spc_-0-05px ub-dspl_block ub-mb_4px ub-box-szg_border-box\\" for=\\"TextInputField-2\\">Name </label><input class=\\"css-5ljhhe ub-color_425A70 ub-fnt-fam_b77syt ub-fnt-sze_12px ub-f-wght_400 ub-ln-ht_16px ub-ltr-spc_0 ub-w_100prcnt ub-h_32px ub-pl_10px ub-pr_10px ub-bblr_3px ub-bbrr_3px ub-btlr_3px ub-btrr_3px ub-box-szg_border-box\\" type=\\"text\\" spellcheck=\\"true\\" aria-invalid=\\"false\\" id=\\"TextInputField-2\\" value=\\"name\\"></div>
              <div data-accordion-component=\\"Accordion\\" class=\\"accordion\\">
                <div data-accordion-component=\\"AccordionItem\\" class=\\"accordion__item\\">
                  <div data-accordion-component=\\"AccordionItemHeading\\" role=\\"heading\\" class=\\"accordion__heading\\" aria-level=\\"3\\">
                    <div class=\\"accordion__button\\" id=\\"accordion__heading-raa-5\\" aria-disabled=\\"false\\" aria-expanded=\\"false\\" aria-controls=\\"accordion__panel-raa-5\\" role=\\"button\\" tabindex=\\"0\\" data-accordion-component=\\"AccordionItemButton\\">
                      <div class=\\"css-nil ub-b-btm_1px-solid-EDF0F2 ub-pb_16px ub-pl_16px ub-pr_16px ub-pt_16px ub-box-szg_border-box\\">
                        <h2 class=\\"ub-mt_0px ub-mb_0px ub-fnt-sze_16px ub-f-wght_500 ub-ln-ht_20px ub-ltr-spc_-0-05px ub-fnt-fam_b77syt ub-color_234361 ub-box-szg_border-box\\">Imputation</h2>
                      </div>
                    </div>
                  </div>
                  <div data-accordion-component=\\"AccordionItemPanel\\" class=\\"accordion__panel\\" aria-hidden=\\"true\\" aria-labelledby=\\"accordion__heading-raa-5\\" id=\\"accordion__panel-raa-5\\" hidden=\\"\\">
                    <div>loading...</div>
                  </div>
                </div>
                <div data-accordion-component=\\"AccordionItem\\" class=\\"accordion__item\\">
                  <div data-accordion-component=\\"AccordionItemHeading\\" role=\\"heading\\" class=\\"accordion__heading\\" aria-level=\\"3\\">
                    <div class=\\"accordion__button\\" id=\\"accordion__heading-raa-6\\" aria-disabled=\\"false\\" aria-expanded=\\"false\\" aria-controls=\\"accordion__panel-raa-6\\" role=\\"button\\" tabindex=\\"0\\" data-accordion-component=\\"AccordionItemButton\\">
                      <div class=\\"css-nil ub-b-btm_1px-solid-EDF0F2 ub-pb_16px ub-pl_16px ub-pr_16px ub-pt_16px ub-box-szg_border-box\\">
                        <h2 class=\\"ub-mt_0px ub-mb_0px ub-fnt-sze_16px ub-f-wght_500 ub-ln-ht_20px ub-ltr-spc_-0-05px ub-fnt-fam_b77syt ub-color_234361 ub-box-szg_border-box\\">Features</h2>
                      </div>
                    </div>
                  </div>
                  <div data-accordion-component=\\"AccordionItemPanel\\" class=\\"accordion__panel\\" aria-hidden=\\"true\\" aria-labelledby=\\"accordion__heading-raa-6\\" id=\\"accordion__panel-raa-6\\" hidden=\\"\\">
                    <div>loading...</div>
                  </div>
                </div>
                <div data-accordion-component=\\"AccordionItem\\" class=\\"accordion__item\\">
                  <div data-accordion-component=\\"AccordionItemHeading\\" role=\\"heading\\" class=\\"accordion__heading\\" aria-level=\\"3\\">
                    <div class=\\"accordion__button\\" id=\\"accordion__heading-raa-7\\" aria-disabled=\\"false\\" aria-expanded=\\"false\\" aria-controls=\\"accordion__panel-raa-7\\" role=\\"button\\" tabindex=\\"0\\" data-accordion-component=\\"AccordionItemButton\\">
                      <div class=\\"css-nil ub-b-btm_1px-solid-EDF0F2 ub-pb_16px ub-pl_16px ub-pr_16px ub-pt_16px ub-box-szg_border-box\\">
                        <h2 class=\\"ub-mt_0px ub-mb_0px ub-fnt-sze_16px ub-f-wght_500 ub-ln-ht_20px ub-ltr-spc_-0-05px ub-fnt-fam_b77syt ub-color_234361 ub-box-szg_border-box\\">Normalizer</h2>
                      </div>
                    </div>
                  </div>
                  <div data-accordion-component=\\"AccordionItemPanel\\" class=\\"accordion__panel\\" aria-hidden=\\"true\\" aria-labelledby=\\"accordion__heading-raa-7\\" id=\\"accordion__panel-raa-7\\" hidden=\\"\\">
                    <div>loading...</div>
                  </div>
                </div>
                <div data-accordion-component=\\"AccordionItem\\" class=\\"accordion__item\\">
                  <div data-accordion-component=\\"AccordionItemHeading\\" role=\\"heading\\" class=\\"accordion__heading\\" aria-level=\\"3\\">
                    <div class=\\"accordion__button\\" id=\\"accordion__heading-raa-8\\" aria-disabled=\\"false\\" aria-expanded=\\"false\\" aria-controls=\\"accordion__panel-raa-8\\" role=\\"button\\" tabindex=\\"0\\" data-accordion-component=\\"AccordionItemButton\\">
                      <div class=\\"css-nil ub-b-btm_1px-solid-EDF0F2 ub-pb_16px ub-pl_16px ub-pr_16px ub-pt_16px ub-box-szg_border-box\\">
                        <h2 class=\\"ub-mt_0px ub-mb_0px ub-fnt-sze_16px ub-f-wght_500 ub-ln-ht_20px ub-ltr-spc_-0-05px ub-fnt-fam_b77syt ub-color_234361 ub-box-szg_border-box\\">Classifier</h2>
                      </div>
                    </div>
                  </div>
                  <div data-accordion-component=\\"AccordionItemPanel\\" class=\\"accordion__panel\\" aria-hidden=\\"true\\" aria-labelledby=\\"accordion__heading-raa-8\\" id=\\"accordion__panel-raa-8\\" hidden=\\"\\">
                    <div>loading...</div>
                  </div>
                </div>
                <div data-accordion-component=\\"AccordionItem\\" class=\\"accordion__item\\">
                  <div data-accordion-component=\\"AccordionItemHeading\\" role=\\"heading\\" class=\\"accordion__heading\\" aria-level=\\"3\\">
                    <div class=\\"accordion__button\\" id=\\"accordion__heading-raa-9\\" aria-disabled=\\"false\\" aria-expanded=\\"false\\" aria-controls=\\"accordion__panel-raa-9\\" role=\\"button\\" tabindex=\\"0\\" data-accordion-component=\\"AccordionItemButton\\">
                      <div class=\\"css-nil ub-pb_16px ub-pl_16px ub-pr_16px ub-pt_16px ub-box-szg_border-box\\">
                        <h2 class=\\"ub-mt_0px ub-mb_0px ub-fnt-sze_16px ub-f-wght_500 ub-ln-ht_20px ub-ltr-spc_-0-05px ub-fnt-fam_b77syt ub-color_234361 ub-box-szg_border-box\\">Hyperparameters</h2>
                      </div>
                    </div>
                  </div>
                  <div data-accordion-component=\\"AccordionItemPanel\\" class=\\"accordion__panel\\" aria-hidden=\\"true\\" aria-labelledby=\\"accordion__heading-raa-9\\" id=\\"accordion__panel-raa-9\\" hidden=\\"\\">
                    <div>loading...</div>
                  </div>
                </div>
              </div><button class=\\"css-nwvixr ub-fnt-fam_b77syt ub-mt_0px ub-fnt-sze_12px ub-f-wght_500 ub-ln-ht_32px ub-ltr-spc_0 ub-btrr_3px ub-bbrr_3px ub-btlr_3px ub-bblr_3px ub-pt_0px ub-pb_0px ub-pr_16px ub-pl_16px ub-ml_0px ub-mr_0px ub-mb_0px ub-h_32px ub-pst_relative ub-dspl_inline-flex ub-algn-itms_center ub-flx-wrap_nowrap ub-algn-slf_flex-end ub-box-szg_border-box\\">Train</button>
            </div>"
        `); /* ... gets filled automatically by jest ... */
    });
});

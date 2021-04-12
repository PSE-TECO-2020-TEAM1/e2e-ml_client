import React from 'react';
import ReactDOM from 'react-dom';
import WorkspaceLabelsPageView, { Label } from 'components/WorkspaceLabels';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import { PromisePack, State } from 'lib/hooks/Promise';

const noop = () => {};
const labelpack: PromisePack<Label[]> = [State.Resolved, [], undefined];

describe('workspaceLabelsPage', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <WorkspaceLabelsPageView
                labelsPH={labelpack} //object
                createName={'name'}
                onCreateName={noop}
                onCreate={noop}
                onDeleteLabel={noop}
            />,
            div
        );
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(
                <WorkspaceLabelsPageView
                    labelsPH={labelpack} //object
                    createName={'name'}
                    onCreateName={noop}
                    onCreate={noop}
                    onDeleteLabel={noop}
                />,
                div
            );
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(`
            "<div class=\\"css-nil ub-dspl_flex ub-flx-drct_column ub-box-szg_border-box\\">
              <div class=\\"css-nil ub-b-btm_1px-solid-E4E7EB ub-bg_1eozcqw ub-dspl_flex ub-flx-srnk_0 ub-pr_0px ub-h_32px ub-box-szg_border-box\\">
                <div class=\\"css-saeo60 css-nil ub-pl_12px ub-pr_12px ub-box-szg_border-box ub-flx_0 ub-dspl_flex ub-algn-itms_center ub-flx-srnk_0 ub-ovflw-x_visible ub-ovflw-y_visible ub-flx-basis_40px\\"><span class=\\"ub-color_425A70 ub-fnt-fam_b77syt ub-fnt-sze_12px ub-f-wght_500 ub-ln-ht_16px ub-ltr-spc_0 ub-flx_1 ub-box-szg_border-box\\"># </span></div>
                <div class=\\"css-saeo60 css-nil ub-pl_12px ub-pr_12px ub-box-szg_border-box ub-flx_1 ub-dspl_flex ub-algn-itms_center ub-flx-srnk_0 ub-ovflw-x_visible ub-ovflw-y_visible\\"><span class=\\"ub-color_425A70 ub-fnt-fam_b77syt ub-fnt-sze_12px ub-f-wght_500 ub-ln-ht_16px ub-ltr-spc_0 ub-flx_1 ub-box-szg_border-box\\">Labels </span></div>
                <div class=\\"css-saeo60 css-nil ub-pl_12px ub-pr_12px ub-box-szg_border-box ub-flx_1 ub-dspl_flex ub-algn-itms_center ub-flx-srnk_0 ub-ovflw-x_visible ub-ovflw-y_visible\\"><span class=\\"ub-color_425A70 ub-fnt-fam_b77syt ub-fnt-sze_12px ub-f-wght_500 ub-ln-ht_16px ub-ltr-spc_0 ub-flx_1 ub-box-szg_border-box\\">Description </span></div>
                <div class=\\"css-saeo60 css-nil ub-pl_12px ub-pr_12px ub-box-szg_border-box ub-flx_0 ub-dspl_flex ub-algn-itms_center ub-flx-srnk_0 ub-ovflw-x_visible ub-ovflw-y_visible ub-flx-basis_80px\\"><span class=\\"ub-color_425A70 ub-fnt-fam_b77syt ub-fnt-sze_12px ub-f-wght_500 ub-ln-ht_16px ub-ltr-spc_0 ub-flx_1 ub-box-szg_border-box\\">Samples </span></div>
                <div class=\\"css-saeo60 css-nil ub-pl_12px ub-pr_12px ub-box-szg_border-box ub-flx_0 ub-dspl_flex ub-algn-itms_center ub-flx-srnk_0 ub-ovflw-x_visible ub-ovflw-y_visible ub-flx-basis_56px\\"></div>
                <div aria-hidden=\\"true\\" style=\\"position: fixed; top: -500px; left: -500px; width: 100px; overflow-y: scroll;\\">
                  <div></div>
                </div>
              </div>
              <div data-evergreen-table-body=\\"true\\" class=\\"css-nil ub-flx_1 ub-ovflw-y_auto ub-box-szg_border-box\\">
                <div class=\\"css-b5v4p5 css-nil ub-b-btm_1px-solid-EDF0F2 ub-dspl_flex ub-h_96px ub-just-cnt_center ub-algn-itms_center ub-box-szg_border-box\\"><small class=\\"ub-fnt-sze_85prcnt ub-box-szg_border-box\\">No labels created yet, create one below</small></div>
                <div class=\\"css-b5v4p5 css-nil ub-b-btm_none ub-dspl_flex ub-h_48px ub-box-szg_border-box\\">
                  <div class=\\"css-saeo60 css-nil ub-pl_12px ub-pr_12px ub-box-szg_border-box ub-flx_0 ub-dspl_flex ub-algn-itms_center ub-flx-srnk_0 ub-ovflw-x_hidden ub-ovflw-y_hidden ub-flx-basis_64px\\"><span class=\\"ub-color_425A70 ub-fnt-fam_b77syt ub-fnt-sze_12px ub-f-wght_400 ub-ln-ht_16px ub-ltr-spc_0 ub-flx_1 ub-ovflw-x_hidden ub-ovflw-y_hidden ub-txt-ovrf_ellipsis ub-wht-spc_nowrap ub-box-szg_border-box\\">Name: </span></div>
                  <div class=\\"css-saeo60 css-nil ub-pl_12px ub-pr_12px ub-box-szg_border-box ub-flx_1 ub-dspl_flex ub-algn-itms_center ub-flx-srnk_0 ub-ovflw-x_hidden ub-ovflw-y_hidden ub-crsr_default\\" tabindex=\\"-1\\" data-isselectable=\\"true\\"><span class=\\"ub-color_425A70 ub-fnt-fam_b77syt ub-fnt-sze_12px ub-f-wght_400 ub-ln-ht_16px ub-ltr-spc_0 ub-flx_1 ub-ovflw-x_hidden ub-ovflw-y_hidden ub-txt-ovrf_ellipsis ub-wht-spc_nowrap ub-opct_1 ub-box-szg_border-box\\">name</span></div>
                  <div class=\\"css-saeo60 css-nil ub-pl_12px ub-pr_12px ub-box-szg_border-box ub-flx_0 ub-dspl_flex ub-algn-itms_center ub-flx-srnk_0 ub-ovflw-x_hidden ub-ovflw-y_hidden ub-flx-basis_96px\\"><button class=\\"css-nwvixr ub-fnt-fam_b77syt ub-mt_0px ub-fnt-sze_12px ub-f-wght_500 ub-ln-ht_32px ub-ltr-spc_0 ub-btrr_3px ub-bbrr_3px ub-btlr_3px ub-bblr_3px ub-pt_0px ub-pb_0px ub-pr_16px ub-pl_16px ub-ml_0px ub-mr_0px ub-mb_0px ub-h_32px ub-pst_relative ub-dspl_inline-flex ub-algn-itms_center ub-flx-wrap_nowrap ub-box-szg_border-box\\">Create</button></div>
                </div>
              </div>
            </div>"
        `); /* ... gets filled automatically by jest ... */
    });
});

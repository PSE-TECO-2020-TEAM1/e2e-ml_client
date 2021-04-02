import React from 'react';
import ReactDOM from 'react-dom';
import WorkspaceModels from 'components/WorkspaceModels';
import { Model } from 'components/WorkspaceModels';
import { State, PromisePack } from 'lib/hooks/Promise';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

let tab: PromisePack<Model[]> = [
    State.Resolved,
    [
        {
            name: 'string',
            id: 'string',
            href: 'string',
            modelDetailsHref: 'string',
            onDelete: () => {},
        },
    ],
    Error,
];
describe('WorkspaceModelsPage', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(<WorkspaceModels modelsPH={tab} />, div);
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(<WorkspaceModels modelsPH={tab} />, div);
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(`
            "<div class=\\"css-nil ub-dspl_flex ub-flx-drct_column ub-box-szg_border-box\\">
              <div class=\\"css-nil ub-b-btm_1px-solid-E4E7EB ub-bg_1eozcqw ub-dspl_flex ub-flx-srnk_0 ub-pr_0px ub-h_32px ub-box-szg_border-box\\">
                <div class=\\"css-saeo60 css-nil ub-pl_12px ub-pr_12px ub-box-szg_border-box ub-flx_0 ub-dspl_flex ub-algn-itms_center ub-flx-srnk_0 ub-ovflw-x_visible ub-ovflw-y_visible ub-flx-basis_40px\\"><span class=\\"ub-color_425A70 ub-fnt-fam_b77syt ub-fnt-sze_12px ub-f-wght_500 ub-ln-ht_16px ub-ltr-spc_0 ub-flx_1 ub-box-szg_border-box\\"># </span></div>
                <div class=\\"css-saeo60 css-nil ub-pl_12px ub-pr_12px ub-box-szg_border-box ub-flx_1 ub-dspl_flex ub-algn-itms_center ub-flx-srnk_0 ub-ovflw-x_visible ub-ovflw-y_visible\\"><span class=\\"ub-color_425A70 ub-fnt-fam_b77syt ub-fnt-sze_12px ub-f-wght_500 ub-ln-ht_16px ub-ltr-spc_0 ub-flx_1 ub-box-szg_border-box\\">Models </span></div>
                <div class=\\"css-saeo60 css-nil ub-pl_12px ub-pr_12px ub-box-szg_border-box ub-flx_0 ub-dspl_flex ub-algn-itms_center ub-flx-srnk_0 ub-ovflw-x_visible ub-ovflw-y_visible ub-flx-basis_56px\\"></div>
                <div aria-hidden=\\"true\\" style=\\"position: fixed; top: -500px; left: -500px; width: 100px; overflow-y: scroll;\\">
                  <div></div>
                </div>
              </div>
              <div data-evergreen-table-body=\\"true\\" class=\\"css-nil ub-flx_1 ub-ovflw-y_auto ub-box-szg_border-box\\">
                <div class=\\"css-b5v4p5 css-nil ub-b-btm_1px-solid-EDF0F2 ub-dspl_flex ub-h_48px ub-box-szg_border-box\\">
                  <div class=\\"css-saeo60 css-nil ub-pl_12px ub-pr_12px ub-box-szg_border-box ub-flx_0 ub-dspl_flex ub-algn-itms_center ub-flx-srnk_0 ub-ovflw-x_hidden ub-ovflw-y_hidden ub-color_muted ub-flx-basis_40px\\"><span class=\\"ub-color_425A70 ub-fnt-fam_b77syt ub-fnt-sze_12px ub-f-wght_400 ub-ln-ht_16px ub-ltr-spc_0 ub-flx_1 ub-ovflw-x_hidden ub-ovflw-y_hidden ub-txt-ovrf_ellipsis ub-wht-spc_nowrap ub-box-szg_border-box\\">0</span></div>
                  <div class=\\"css-saeo60 css-nil ub-pl_12px ub-pr_12px ub-box-szg_border-box ub-flx_1 ub-dspl_flex ub-algn-itms_center ub-flx-srnk_0 ub-ovflw-x_hidden ub-ovflw-y_hidden\\"><span class=\\"ub-color_425A70 ub-fnt-fam_b77syt ub-fnt-sze_12px ub-f-wght_400 ub-ln-ht_16px ub-ltr-spc_0 ub-flx_1 ub-ovflw-x_hidden ub-ovflw-y_hidden ub-txt-ovrf_ellipsis ub-wht-spc_nowrap ub-box-szg_border-box\\"><a class=\\"css-1ii3p2c ub-fnt-fam_b77syt ub-mt_0px ub-fnt-sze_12px ub-f-wght_500 ub-ln-ht_32px ub-ltr-spc_0 ub-btrr_3px ub-bbrr_3px ub-btlr_3px ub-bblr_3px ub-pt_0px ub-pb_0px ub-pr_16px ub-pl_16px ub-ml_0px ub-mr_0px ub-mb_0px ub-h_32px ub-pst_relative ub-dspl_inline-flex ub-algn-itms_center ub-flx-wrap_nowrap ub-w_100prcnt ub-box-szg_border-box\\" href=\\"string\\">string</a></span></div>
                  <div class=\\"css-saeo60 css-nil ub-pl_12px ub-pr_12px ub-box-szg_border-box ub-flx_0 ub-dspl_flex ub-algn-itms_center ub-flx-srnk_0 ub-ovflw-x_hidden ub-ovflw-y_hidden ub-flx-basis_96px ub-gap_8px ub-just-cnt_flex-end\\"><a class=\\"css-1ii3p2c ub-fnt-fam_b77syt ub-mt_0px ub-fnt-sze_12px ub-f-wght_500 ub-ln-ht_32px ub-ltr-spc_0 ub-btrr_3px ub-bbrr_3px ub-btlr_3px ub-bblr_3px ub-pt_0px ub-pb_0px ub-pr_0px ub-pl_0px ub-ml_0px ub-mr_0px ub-mb_0px ub-h_32px ub-pst_relative ub-dspl_flex ub-algn-itms_center ub-flx-wrap_nowrap ub-w_32px ub-just-cnt_center ub-box-szg_border-box\\" aria-describedby=\\"evergreen-tooltip-2\\" href=\\"string\\">
                      <div class=\\"ub-dspl_inline-flex ub-box-szg_border-box\\"><svg data-icon=\\"barcode\\" style=\\"fill: #66788A;\\" viewBox=\\"0 0 16 16\\" class=\\"ub-w_14px ub-h_14px ub-box-szg_border-box\\">
                          <path d=\\"M0 14h2V2H0v12zm6 0h1V2H6v12zm2 0h1V2H8v12zm-5 0h2V2H3v12zM15 2v12h1V2h-1zm-5 12h1V2h-1v12zm2 0h2V2h-2v12z\\" fill-rule=\\"evenodd\\"></path>
                        </svg></div>
                    </a><button class=\\"css-1ii3p2c ub-fnt-fam_b77syt ub-mt_0px ub-fnt-sze_12px ub-f-wght_500 ub-ln-ht_32px ub-ltr-spc_0 ub-btrr_3px ub-bbrr_3px ub-btlr_3px ub-bblr_3px ub-pt_0px ub-pb_0px ub-pr_0px ub-pl_0px ub-ml_0px ub-mr_0px ub-mb_0px ub-h_32px ub-pst_relative ub-dspl_flex ub-algn-itms_center ub-flx-wrap_nowrap ub-w_32px ub-just-cnt_center ub-box-szg_border-box\\" role=\\"button\\" aria-haspopup=\\"true\\">
                      <div class=\\"ub-dspl_inline-flex ub-box-szg_border-box\\"><svg data-icon=\\"more\\" style=\\"fill: #66788A;\\" viewBox=\\"0 0 16 16\\" class=\\"ub-w_14px ub-h_14px ub-box-szg_border-box\\">
                          <path d=\\"M2 6.03a2 2 0 100 4 2 2 0 100-4zM14 6.03a2 2 0 100 4 2 2 0 100-4zM8 6.03a2 2 0 100 4 2 2 0 100-4z\\" fill-rule=\\"evenodd\\"></path>
                        </svg></div>
                    </button></div>
                </div>
              </div>
            </div>"
        `); /* ... gets filled automatically by jest ... */
    });
});

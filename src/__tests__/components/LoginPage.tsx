import React from 'react';
import ReactDOM from 'react-dom';
import LoginPageView from 'components/LoginPageView';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

const noop = () => {};

describe('LoginPage', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <LoginPageView
                user={'omer'}
                pass={'123'}
                onUser={noop}
                onPass={noop}
                onButton={noop}
            />,
            div
        );
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(
                <LoginPageView
                    user={'omer'}
                    pass={'123'}
                    onUser={noop}
                    onPass={noop}
                    onButton={noop}
                />,
                div
            );
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(`
            "<form class=\\"css-nil ub-dspl_flex ub-flx-drct_column ub-gap_16px ub-algn-itms_center ub-box-szg_border-box\\">
              <h2 class=\\"ub-mt_0px ub-mb_0px ub-fnt-sze_16px ub-f-wght_500 ub-ln-ht_20px ub-ltr-spc_-0-05px ub-fnt-fam_b77syt ub-color_234361 ub-box-szg_border-box\\">Please enter your credentials</h2><input class=\\"css-5ljhhe ub-color_425A70 ub-fnt-fam_b77syt ub-fnt-sze_12px ub-f-wght_400 ub-ln-ht_16px ub-ltr-spc_0 ub-w_280px ub-h_32px ub-pl_10px ub-pr_10px ub-bblr_3px ub-bbrr_3px ub-btlr_3px ub-btrr_3px ub-box-szg_border-box\\" type=\\"text\\" placeholder=\\"Username\\" spellcheck=\\"true\\" aria-invalid=\\"false\\" name=\\"username\\" value=\\"omer\\"><input class=\\"css-5ljhhe ub-color_425A70 ub-fnt-fam_b77syt ub-fnt-sze_12px ub-f-wght_400 ub-ln-ht_16px ub-ltr-spc_0 ub-w_280px ub-h_32px ub-pl_10px ub-pr_10px ub-bblr_3px ub-bbrr_3px ub-btlr_3px ub-btrr_3px ub-box-szg_border-box\\" type=\\"password\\" placeholder=\\"Password\\" spellcheck=\\"true\\" aria-invalid=\\"false\\" name=\\"password\\" value=\\"123\\"><button class=\\"css-69cngj ub-fnt-fam_b77syt ub-mt_0px ub-fnt-sze_12px ub-f-wght_500 ub-ln-ht_32px ub-ltr-spc_0 ub-btrr_3px ub-bbrr_3px ub-btlr_3px ub-bblr_3px ub-pt_0px ub-pb_0px ub-pr_16px ub-pl_16px ub-ml_0px ub-mr_0px ub-mb_0px ub-h_32px ub-pst_relative ub-dspl_inline-flex ub-algn-itms_center ub-flx-wrap_nowrap ub-box-szg_border-box\\">Log In</button>
            </form>"
        `); /* ... gets filled automatically by jest ... */
    });
});

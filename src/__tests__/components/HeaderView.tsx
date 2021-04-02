import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import HeaderView from 'components/HeaderView';
import { Promised, PromisePack } from 'lib/hooks/Promise';

//let tab: { name: string; data: [number, number][] }[] = [
//   { name: 'id', data: [[5, 5]] },
//];

describe('HeaderView', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(<HeaderView />, div);
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(<HeaderView />, div);
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(`
            "<div class=\\"css-nil ub-bg_3c7ppm ub-dspl_flex ub-pb_16px ub-pl_16px ub-pr_16px ub-pt_16px ub-pst_relative ub-mb_48px ub-box-szg_border-box\\">
              <h2 class=\\"ub-mt_0px ub-mb_0px ub-fnt-sze_24px ub-f-wght_500 ub-ln-ht_28px ub-ltr-spc_-0-07px ub-fnt-fam_wm9v6k ub-color_234361 ub-flx_1 ub-algn-itms_center ub-dspl_flex ub-box-szg_border-box\\"><span></span></h2>
              <div class=\\"css-nil ub-dspl_flex ub-box-szg_border-box\\"><span class=\\"ub-color_425A70 ub-fnt-fam_b77syt ub-fnt-sze_14px ub-f-wght_400 ub-ln-ht_20px ub-ltr-spc_-0-05px ub-box-szg_border-box\\"></span></div>
            </div>"
        `); /* ... gets filled automatically by jest ... */
    });
});

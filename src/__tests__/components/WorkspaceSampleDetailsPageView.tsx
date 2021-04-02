import React from 'react';
import ReactDOM from 'react-dom';
import WorkspaceSampleDetailsPageView from 'components/WorkspaceSampleDetailsPageView';
import { State, PromisePack } from 'lib/hooks/Promise';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import { UnixTimestamp } from 'lib/utils';

const noop = () => {};
const noop1 = (pos: UnixTimestamp) => {};
const noop2 = (label: string) => {};
let range: {
    from: UnixTimestamp;
    to: UnixTimestamp;
    color: string;
    del: () => void;
}[] = [{ from: 0, to: 1, color: 'red', del: noop }];
let point: {
    name: string;
    data: [number, number][];
}[] = [{ name: 'name', data: [[5, 5]] }];
let tab3: {
    label: string;
    start: UnixTimestamp;
    end: UnixTimestamp;
    points: { name: string; data: [number, number][] }[];
    ranges: {
        from: UnixTimestamp;
        to: UnixTimestamp;
        color: string;
        del: () => void;
    }[];
} = [{ label: 'label', start: 0, end: 0, points: point, ranges: range }];
let tab2: PromisePack<{
    label: string;
    start: UnixTimestamp;
    end: UnixTimestamp;
    points: { name: string; data: [number, number][] }[];
    ranges: {
        from: UnixTimestamp;
        to: UnixTimestamp;
        color: string;
        del: () => void;
    }[];
}> = [State.Pending, tab3, Error];

let tab1: {
    id: string;
    name: string;
}[] = [{ id: 'id', name: 'name' }];
let tab: PromisePack<
    {
        id: string;
        name: string;
    }[]
> = [State.Pending, tab1, Error];
describe('RecordingPage', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <WorkspaceSampleDetailsPageView
                labelsPH={tab}
                samplePH={tab2}
                onGraphClick={noop1}
                onLabel={noop2}
                timeframeAction={noop}
                timeframeActionName={'name'}
            />,
            div
        );
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(
                <WorkspaceSampleDetailsPageView
                    labelsPH={tab}
                    samplePH={tab2}
                    onGraphClick={noop1}
                    onLabel={noop2}
                    timeframeAction={noop}
                    timeframeActionName={'name'}
                />,
                div
            );
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(`
            "<div class=\\"css-nil ub-box-szg_border-box\\">
              <div class=\\"css-nil ub-dspl_flex ub-gap_16px ub-just-cnt_space-evenly ub-box-szg_border-box\\">
                <div class=\\"css-nil ub-dspl_flex ub-gap_16px ub-algn-itms_baseline ub-box-szg_border-box\\">
                  <h2 class=\\"ub-mt_0px ub-mb_0px ub-fnt-sze_16px ub-f-wght_500 ub-ln-ht_20px ub-ltr-spc_-0-05px ub-fnt-fam_b77syt ub-color_234361 ub-box-szg_border-box\\">Label: </h2>loading label...
                </div>loading metadata...
              </div>loading sample graph...loading sample graph...
            </div>"
        `); /* ... gets filled automatically by jest ... */
    });
});

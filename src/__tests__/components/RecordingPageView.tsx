import React from 'react';
import ReactDOM from 'react-dom';
import RecordingPageView from 'components/RecordingPageView';
import { State, PromisePack } from 'lib/hooks/Promise';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

const noop = () => {};
const sensor = {
    timestamp: 50,
    data: [50, 50, 1],
};

let tab1: {
    name: string;
    rate: number;
}[] = [{ name: 'label', rate: 5 }];
let tab: PromisePack<
    {
        name: string;
        rate: number;
    }[]
> = [State.Pending, tab1, Error];
describe('RecordingPage', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <RecordingPageView
                data={{
                    Accelerometer: [sensor],
                    Gyroscope: [sensor],
                    Magnetometer: [sensor],
                }}
                format={{
                    Accelerometer: ['', ''],
                    Gyroscope: ['', ''],
                    Magnetometer: ['', ''],
                }}
                label={'label'}
                sensorsPH={tab}
                countdown={10}
                remaining={5}
                isRecording={false}
                isPre={true}
                canSend={true}
                onSend={noop}
            />,
            div
        );
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(
                <RecordingPageView
                    data={{
                        Accelerometer: [sensor],
                        Gyroscope: [sensor],
                        Magnetometer: [sensor],
                    }}
                    format={{
                        Accelerometer: ['', ''],
                        Gyroscope: ['', ''],
                        Magnetometer: ['', ''],
                    }}
                    label={'label'}
                    sensorsPH={tab}
                    countdown={10}
                    remaining={5}
                    isRecording={false}
                    isPre={true}
                    canSend={true}
                    onSend={noop}
                />,
                div
            );
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(
            '"<header>Prepare to Record Data</header><b>label</b><span>10</span><span>seconds</span><em>Selected Sensors and Sampling Rates:</em>loading..."',
            `
            "<div class=\\"css-nil ub-gap_16px ub-dspl_grid ub-grd-tmp-col_kotc55 ub-box-szg_border-box\\">
              <h2 class=\\"ub-mt_0px ub-mb_0px ub-fnt-sze_16px ub-f-wght_500 ub-ln-ht_20px ub-ltr-spc_-0-05px ub-fnt-fam_b77syt ub-color_234361 ub-grd-col_cxudig ub-box-szg_border-box\\">Prepare to Record Data</h2><span class=\\"ub-color_425A70 ub-fnt-fam_b77syt ub-fnt-sze_14px ub-f-wght_400 ub-ln-ht_20px ub-ltr-spc_-0-05px ub-grd-col_11wpgbn ub-box-szg_border-box\\">Label: label</span><span class=\\"ub-color_425A70 ub-fnt-fam_b77syt ub-fnt-sze_14px ub-f-wght_400 ub-ln-ht_20px ub-ltr-spc_-0-05px ub-grd-col_cs5v99 ub-box-szg_border-box\\">10 seconds remaining</span>
              <h2 class=\\"ub-mt_0px ub-mb_0px ub-fnt-sze_16px ub-f-wght_500 ub-ln-ht_20px ub-ltr-spc_-0-05px ub-fnt-fam_b77syt ub-color_234361 ub-grd-col_cxudig ub-box-szg_border-box\\">Selected Sensors and Sampling Rates:</h2>loading...
            </div>"
        `
        ); /* ... gets filled automatically by jest ... */
    });
});

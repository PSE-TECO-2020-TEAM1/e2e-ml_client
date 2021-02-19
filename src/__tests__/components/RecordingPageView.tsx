import React from 'react';
import ReactDOM from 'react-dom';
import RecordingPageView from 'components/RecordingPageView';
import { State, PromisePack } from 'lib/hooks/Promise';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

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
                label={'label'}
                sensorsPH={tab}
                countdown={10}
                remaining={5}
                isRecording={false}
                isPre={true}
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
                    label={'label'}
                    sensorsPH={tab}
                    countdown={10}
                    remaining={5}
                    isRecording={false}
                    isPre={true}
                />,
                div
            );
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(
            '"<header>Prepare to Record Data</header><b>label</b><span>10</span><span>seconds</span><em>Selected Sensors and Sampling Rates:</em>loading..."'
        ); /* ... gets filled automatically by jest ... */
    });
});

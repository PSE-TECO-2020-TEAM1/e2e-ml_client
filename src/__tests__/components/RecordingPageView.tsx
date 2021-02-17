import React from 'react';
import ReactDOM from 'react-dom';
import RecordingPageView from 'components/RecordingPageView';
import { State, PromisePack } from 'lib/hooks/Promise';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';


const noop = () => {};
let tab1: {
    name: string;
    rate: number;
}[] = { name: 'lable', rate: 5 };
let tab: PromisePack<
    {
        name: string;
        rate: number;
    }[]
> = [State.Pending, tab1, Error];
describe('RecordingPage', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(<RecordingPageView data = {DataRecord}
            label = {'label'}
            sensorsPH = {tab}
            countdown= {10}
            remaining= {5}
            isRecording= {false}
            isPre={true} />, div);
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(<RecordingPageView data = {DataRecord}
                label = {'label'}
                sensorsPH = {tab}
                countdown= {10}
                remaining= {5}
                isRecording= {false}
                isPre={true}/>, div);
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(); /* ... gets filled automatically by jest ... */
    });
});

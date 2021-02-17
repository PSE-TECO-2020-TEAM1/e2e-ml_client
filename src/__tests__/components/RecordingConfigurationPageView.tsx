import React from 'react';
import ReactDOM from 'react-dom';
import RecordingConfigurationPageView from 'components/RecordingConfigurationPageView';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

const noop = () => {};

describe('RecordingConfigurationPage', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <RecordingConfigurationPageView
                href={'omer'}
                duration={10}
                countdown={5}
                onDuration={noop}
                onCountdown={noop}
            />,
            div
        );
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(
                <RecordingConfigurationPageView
                    href={'omer'}
                    duration={10}
                    countdown={5}
                    onDuration={noop}
                    onCountdown={noop}
                />,
                div
            );
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(`
            "<header>Configure Recording Parameters:</header>
            <ul>
              <li><em>Countdown: </em><input type=\\"number\\" min=\\"0\\" value=\\"5\\"></li>
              <li><em>Duration: </em><input type=\\"number\\" min=\\"0\\" value=\\"10\\"></li>
            </ul><a href=\\"omer\\"><button>Record</button></a>"
        `); /* ... gets filled automatically by jest ... */
    });
});

import React from 'react';
import ReactDOM from 'react-dom';
import CovertTextButtonInput from 'components/CovertTextButtonInput';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

const noop = () => {};

describe('CoverTextButtonInput', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <CovertTextButtonInput
                value={'initial text'}
                onChange={noop}
                buttonRender={'SND'}
            />,
            div
        );
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(
                <CovertTextButtonInput
                    value={'initial text'}
                    onChange={noop}
                    buttonRender={'SND'}
                />,
                div
            );
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(`
            "<div class=\\"container\\">
              <div contenteditable=\\"true\\">initial text</div><button class=\\"button\\">SND</button>
            </div>"
        `); /* ... gets filled automatically by jest ... */
    });
});

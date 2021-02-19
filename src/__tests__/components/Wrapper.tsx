import React from 'react';
import ReactDOM from 'react-dom';
import Wrapper from 'components/Wrapper';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

const noop = () => {};

describe('Wrapper', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(<Wrapper />, div);
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(<Wrapper />, div);
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(
            '"<div class=\\"undefined wrapper big\\"></div>"'
        ); /* ... gets filled automatically by jest ... */
    });
});

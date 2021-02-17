import React from 'react';
import ReactDOM from 'react-dom';
import ModelOptions from 'components/ModelOptions';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

const noop = () => {};

describe('ModelOptions', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(<ModelOptions />, div);
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(<ModelOptions />, div);
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(
            `"<div>TBD</div>"`
        ); /* ... gets filled automatically by jest ... */
    });
});

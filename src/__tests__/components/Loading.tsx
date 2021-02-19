import React from 'react';
import ReactDOM from 'react-dom';
import Loading from 'components/Loading';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

describe('loading', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(<Loading />, div);
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(<Loading />, div);
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(
            '"<div>loading</div>"'
        ); /* ... gets filled automatically by jest ... */
    });
});

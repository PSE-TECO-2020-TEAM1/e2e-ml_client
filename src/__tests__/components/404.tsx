import React from 'react';
import ReactDOM from 'react-dom';
import FourOhFourPage from 'components/404';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

const noop = () => {};

describe('404', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(<FourOhFourPage />, div);
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(<FourOhFourPage />, div);
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(
            '"<div>FourOhFourPage</div>"'
        ); /* ... gets filled automatically by jest ... */
    });
});

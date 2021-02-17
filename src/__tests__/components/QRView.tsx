import React from 'react';
import ReactDOM from 'react-dom';
import QRView from 'components/QRView';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';


const noop = () => {};

describe('QRview', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <QRView desc={'description'} href={'reference'} />,
            div
        );
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(
                <QRView desc={'description'} href={'reference'} />,
                div
            );
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(
            `"<span>description</span><canvas style=\\"height: 128px; width: 128px;\\" height=\\"128\\" width=\\"128\\"></canvas><a href=\\"reference\\">reference</a><button>CPY</button>"`
        ); /* ... gets filled automatically by jest ... */
    });
});

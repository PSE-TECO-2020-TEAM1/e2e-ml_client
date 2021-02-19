import React from 'react';
import ReactDOM from 'react-dom';
import LabelSelectionPageView from 'components/LabelSelectionPageView';
import { State, Promised, PromisePack } from 'lib/hooks/Promise';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

let tab1: {
    label: string;
    href: string;
}[] = [{ label: 'labelName', href: 'ref' }];
let tab: PromisePack<
    {
        label: string;
        href: string;
    }[]
> = [State.Pending, tab1, Error];
describe('LabelSelectionPage', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(<LabelSelectionPageView labelsPH={tab} />, div);
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(<LabelSelectionPageView labelsPH={tab} />, div);
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(`
            "<header>Choose an action to record:</header>
            <nav>loading...</nav>"
        `); /* ... gets filled automatically by jest ... */
    });
});

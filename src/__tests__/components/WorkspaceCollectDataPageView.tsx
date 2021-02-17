import React from 'react';
import ReactDOM from 'react-dom';
import WorkspaceCollectDataPageView from 'components/WorkspaceCollectDataPageView';
import { State, PromisePack } from 'lib/hooks/Promise';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

const noop = () => {};

let tab: PromisePack<string> = [State.Pending, 'link', Error];
describe('WorkspaceCollectDataPage', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <WorkspaceCollectDataPageView collectLinkPH={tab} />,
            div
        );
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(
                <WorkspaceCollectDataPageView collectLinkPH={tab} />,
                div
            );
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(
            `"<div>loading</div>"`
        ); /* ... gets filled automatically by jest ... */
    });
});

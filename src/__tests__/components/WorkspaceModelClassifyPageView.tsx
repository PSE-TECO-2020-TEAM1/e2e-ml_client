import React from 'react';
import ReactDOM from 'react-dom';
import WorkspaceCollectDataPageView from 'components/WorkspaceCollectDataPageView';
import { State, PromisePack } from 'lib/hooks/Promise';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import WorkspaceModelClassifyPageView from 'components/WorkspaceModelClassifyPageView';

let tab: PromisePack<string> = [State.Pending, 'link', Error];
describe('WorkspaceModelClassifyPage', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <WorkspaceModelClassifyPageView classifyLinkPH={tab} />,
            div
        );
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(
                <WorkspaceModelClassifyPageView classifyLinkPH={tab} />,
                div
            );
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(
            '"<div>loading</div>"'
        ); /* ... gets filled automatically by jest ... */
    });
});

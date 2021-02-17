import React from 'react';
import ReactDOM from 'react-dom';
import WorkspaceLabelsPageView from 'components/WorkspaceLabelsPageView';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';


const noop = () => {};

describe('workspaceLabelsPage', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <WorkspaceLabelsPageView
                labelsPH={'omer'}  //object
                createName={'name'}
                onCreateName={noop}
                onCreate={noop}
                onDeleteLabel={noop}
            />,
            div
        );
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(
                <WorkspaceLabelsPageView
                labelsPH={'omer'}  //object
                createName={'name'}
                onCreateName={noop}
                onCreate={noop}
                onDeleteLabel={noop}
                />,
                div
            );
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(); /* ... gets filled automatically by jest ... */
    });
});

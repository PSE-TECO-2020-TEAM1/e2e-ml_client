import React from 'react';
import ReactDOM from 'react-dom';
import WorkspaceCreation from 'components/WorkspaceCreation';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';


const noop = () => {};

describe('WorkspaceCreation', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <WorkspaceCreation
                onCreate={noop}
                onName={noop}
                onSensorSelect={noop}
                onRateSelect={noop}
                name={'Workspace name'}
                valid={false}
                sensorAttrs={}
            />,
            div
        );
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(
                <WorkspaceCreation
                onCreate={noop}
                onName={noop}
                onSensorSelect={noop}
                onRateSelect={noop}
                name={'Workspace name'}
                valid={false}
                sensorAttrs={}
                />,
                div
            );
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(); /* ... gets filled automatically by jest ... */
    });
});

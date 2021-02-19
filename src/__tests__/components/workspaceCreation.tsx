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
                sensorAttrs={{}}
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
                    sensorAttrs={{}}
                />,
                div
            );
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(`
            "<div class=\\"MuiFormControl-root MuiTextField-root MuiFormControl-fullWidth\\"><label class=\\"MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled\\" data-shrink=\\"true\\">Name</label>
              <div class=\\"MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-fullWidth MuiInput-fullWidth MuiInputBase-formControl MuiInput-formControl\\"><input aria-invalid=\\"false\\" type=\\"text\\" class=\\"MuiInputBase-input MuiInput-input\\" value=\\"Workspace name\\"></div>
            </div><label>Choose Sensors:</label><label>Choose sampling rates:</label>
            <ul></ul><button disabled=\\"\\">create</button>"
        `); /* ... gets filled automatically by jest ... */
    });
});

import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'components/TextField';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

const noop = () => {};

describe('textField', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(<TextField onType={noop} />, div);
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(<TextField onType={noop} />, div);
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(`
            "<div class=\\"MuiFormControl-root MuiTextField-root MuiFormControl-fullWidth\\">
              <div class=\\"MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-fullWidth MuiInput-fullWidth MuiInputBase-formControl MuiInput-formControl\\"><input aria-invalid=\\"false\\" type=\\"text\\" class=\\"MuiInputBase-input MuiInput-input\\" value=\\"\\"></div>
            </div>"
        `); /* ... gets filled automatically by jest ... */
    });
});

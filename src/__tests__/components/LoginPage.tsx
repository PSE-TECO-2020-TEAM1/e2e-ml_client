import React from 'react';
import ReactDOM from 'react-dom';
import LoginPageView from 'components/LoginPageView';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

const noop = () => {};

describe('LoginPage', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <LoginPageView
                user={'omer'}
                pass={'123'}
                onUser={noop}
                onPass={noop}
                onButton={noop}
                invalid={false}
            />,
            div
        );
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(
                <LoginPageView
                    user={'omer'}
                    pass={'123'}
                    onUser={noop}
                    onPass={noop}
                    onButton={noop}
                    invalid={false}
                />,
                div
            );
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(`
            "<div class=\\"main wrapper small\\"><label class=\\"header\\">Please enter your credentials.</label>
              <div class=\\"MuiFormControl-root MuiTextField-root MuiFormControl-fullWidth\\"><label class=\\"MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled\\" data-shrink=\\"true\\">Username</label>
                <div class=\\"MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-fullWidth MuiInput-fullWidth MuiInputBase-formControl MuiInput-formControl\\"><input aria-invalid=\\"false\\" type=\\"text\\" class=\\"MuiInputBase-input MuiInput-input\\" value=\\"omer\\"></div>
              </div>
              <div class=\\"MuiFormControl-root MuiTextField-root MuiFormControl-fullWidth\\"><label class=\\"MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled\\" data-shrink=\\"true\\">Password</label>
                <div class=\\"MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-fullWidth MuiInput-fullWidth MuiInputBase-formControl MuiInput-formControl\\"><input aria-invalid=\\"false\\" type=\\"password\\" class=\\"MuiInputBase-input MuiInput-input\\" value=\\"123\\"></div>
              </div><label class=\\"incorrect \\">Invalid credentials entered.</label><button class=\\"MuiButtonBase-root MuiButton-root MuiButton-text\\" tabindex=\\"0\\" type=\\"button\\"><span class=\\"MuiButton-label\\">Log In</span><span class=\\"MuiTouchRipple-root\\"></span></button>
            </div>"
        `); /* ... gets filled automatically by jest ... */
    });
});

import React from 'react';
import ReactDOM from 'react-dom';
import WorkspaceLabelsPageView, {
    Label,
} from 'components/WorkspaceLabelsPageView';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import { PromisePack, State } from 'lib/hooks/Promise';

const noop = () => {};
const labelpack: PromisePack<Label[]> = [State.Resolved, [], undefined];

describe('workspaceLabelsPage', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <WorkspaceLabelsPageView
                labelsPH={labelpack} //object
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
                    labelsPH={labelpack} //object
                    createName={'name'}
                    onCreateName={noop}
                    onCreate={noop}
                    onDeleteLabel={noop}
                />,
                div
            );
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(`
            "<table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Labels</th>
                  <th>Description</th>
                  <th>Samples</th>
                  <th></th>
                </tr>
              </thead>
              <tbody></tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td>
                    <div class=\\"MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-fullWidth MuiInput-fullWidth\\"><input type=\\"text\\" class=\\"MuiInputBase-input MuiInput-input\\" value=\\"name\\"></div>
                  </td>
                  <td><button>CREATE</button></td>
                  <td></td>
                </tr>
              </tfoot>
            </table>"
        `); /* ... gets filled automatically by jest ... */
    });
});

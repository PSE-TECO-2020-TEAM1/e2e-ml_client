import React from 'react';
import ReactDOM from 'react-dom';
import WorkspaceModelsPageView from 'components/WorkspaceModelsPageView';
import { Model } from 'components/WorkspaceModelsPageView';
import { State, PromisePack } from 'lib/hooks/Promise';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

let tab: PromisePack<Model[]> = [
    State.Resolved,
    [
        {
            name: 'string',
            id: 'string',
            href: 'string',
            modelDetailsHref: 'string',
            onDelete: () => {},
        },
    ],
    Error,
];
describe('WorkspaceModelsPage', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(<WorkspaceModelsPageView modelsPH={tab} />, div);
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(<WorkspaceModelsPageView modelsPH={tab} />, div);
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(`
            "<table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Models</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0</td>
                  <td><a href=\\"string\\">string</a></td>
                  <td><button>DEL</button></td>
                  <td><a href=\\"string\\"><button>QR</button></a></td>
                </tr>
              </tbody>
            </table>"
        `); /* ... gets filled automatically by jest ... */
    });
});

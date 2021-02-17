import React from 'react';
import ReactDOM from 'react-dom';
import WorkspaceModelDetailsPageView from 'components/WorkspaceModelDetailsPageView';
import ModelDetails from 'components/WorkspaceModelDetailsPageView';
import { State, PromisePack } from 'lib/hooks/Promise';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

const noop = () => {};

let tab: PromisePack<ModelDetails> = [State.Pending, 'link', Error]; // cannot import type ?
describe('WorkspaceModelDetailsPage', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <WorkspaceModelDetailsPageView modelDetailsPH={tab} />,
            div
        );
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(
                <WorkspaceModelDetailsPageView modelDetailsPH={tab} />,
                div
            );
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(`
            "<header>loading...</header>
            <section>
              <header>Performance Metrics</header>
              <table>
                <thead>
                  <tr>
                    <td>#</td>
                    <th>loading...</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>loading...</th>
                    <td>loading...</td>
                  </tr>
                </tbody>
              </table>
            </section>
            <section>
              <header>Model Parameters</header>
              <ul>
                <li><em>Imputation:</em><span>loading...</span></li>
                <li><em>Feature Extraction:</em><span>loading...</span></li>
                <li><em>Normalizer:</em><span>loading...</span></li>
                <li><em>Classifier:</em><span>loading...</span></li>
                <li><em>Hyperparameters:</em>
                  <ul>
                    <li>loading...</li>
                  </ul>
                </li>
              </ul>
            </section>"
        `); /* ... gets filled automatically by jest ... */
    });
});

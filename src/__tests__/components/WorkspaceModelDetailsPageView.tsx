import React from 'react';
import ReactDOM from 'react-dom';
import WorkspaceModelDetailsPageView from 'components/WorkspaceModelDetailsPageView';
import { ModelDetails } from 'components/WorkspaceModelDetailsPageView';
import { State, PromisePack } from 'lib/hooks/Promise';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

let tab: PromisePack<ModelDetails> = [
    State.Resolved,
    {
        name: 'string',
        perf: {
            headers: ['string'],
            labels: [
                {
                    name: 'string',
                    metrics: [{ key: 'string', data: 5 }],
                },
            ],
        },
        pars: {
            imputation: 'string',
            features: ['string'],
            normalizer: 'string',
            classifier: 'string',
            hyperparameters: [{ name: 'string', value: 'any' }],
        },
    },
    undefined,
];
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
            "<header>string</header>
            <section>
              <header>Performance Metrics</header>
              <table>
                <thead>
                  <tr>
                    <td>#</td>
                    <th>string</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>string</th>
                    <td>5</td>
                  </tr>
                </tbody>
              </table>
            </section>
            <section>
              <header>Model Parameters</header>
              <ul>
                <li><em>Imputation:</em><span>string</span></li>
                <li><em>Feature Extraction:</em><span>string</span></li>
                <li><em>Normalizer:</em><span>string</span></li>
                <li><em>Classifier:</em><span>string</span></li>
                <li><em>Hyperparameters:</em>
                  <ul>
                    <li>string = any</li>
                  </ul>
                </li>
              </ul>
            </section>"
        `); /* ... gets filled automatically by jest ... */
    });
});

import React from 'react';
import ReactDOM from 'react-dom';
import WorkspacePageView from 'components/WorkspacePageView';
import { ModelOptionsProps } from 'components/ModelOptions';
import { SampleListProps } from 'components/SampleList';
import { State, PromisePack } from 'lib/hooks/Promise';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

const noop = () => {};
let tab1: {
    id: string;
    href: string;
}[] = [{ id: 'id', href: 'ref' }];
let tab: PromisePack<
    {
        id: string;
        href: string;
    }[]
> = [State.Pending, tab1, Error];
let samlist: SampleListProps = {
    collectDataHref: 'collection ref',
    onSampleDelete: noop,
    samplesPH: tab,
};
let modopt: ModelOptionsProps = [State.Resolved, 'link', undefined];
describe('WorkspacePage', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <WorkspacePageView
                sampleProps={samlist}
                modelOptionsProps={modopt}
                labelsHref={'label ref'}
                modelsHref={'model ref'}
            />,
            div
        );
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(
                <WorkspacePageView
                    sampleProps={samlist}
                    modelOptionsProps={modopt}
                    labelsHref={'label ref'}
                    modelsHref={'model ref'}
                />,
                div
            );
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(`
            "<div class=\\"undefined wrapper big\\"><a href=\\"collection ref\\">Collect Data</a>
              <ul>
                <div>loading</div>
              </ul><a href=\\"label ref\\">Labels</a><a href=\\"model ref\\">Models</a>
              <div>TBD</div>
            </div>"
        `); /* ... gets filled automatically by jest ... */
    });
});

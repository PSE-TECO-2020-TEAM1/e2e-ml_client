import React from 'react';
import ReactDOM from 'react-dom';
import WorkspacePageView from 'components/WorkspacePageView';
import ModelOptions, { ModelOptionsProps } from 'components/ModelOptions';
import SampleList, { SampleListProps } from 'components/SampleList';
import { State, PromisePack } from 'lib/hooks/Promise';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';


const noop = () => {};
let tab1: {
    id: string;
    href: string;
}[] = { id: 'id', href: 'ref' };
let tab: PromisePack<
    {
        id: string;
        href: string;
    }[]
> = [State.Pending, tab1, Error];
let samlist: SampleListProps = ['collection ref', noop, tab ];
let modopt: ModelOptionsProps = [State.Pending, 'link', Error]; 
describe('WorkspacePage', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(<WorkspacePageView sampleProps={samlist}
            modelOptionsProps= {modopt}
            labelsHref={'label ref'}
            modelsHref={'model ref'} />, div);
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(<WorkspacePageView sampleProps={samlist}
                modelOptionsProps= {modopt}
                labelsHref={'label ref'}
                modelsHref={'model ref'} />, div);
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(); /* ... gets filled automatically by jest ... */
    });
});

import React from 'react';
import ReactDOM from 'react-dom';
import SampleList from 'components/SampleList';
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
describe('SampleList', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <SampleList
                collectDataHref={'reference'}
                onSampleDelete={noop}
                samplesPH={tab}
            />,
            div
        );
    });

    it('renders correctly (snapshot)', () => {
        const div = document.createElement('div');
        act(() => {
            ReactDOM.render(
                <SampleList
                    collectDataHref={'reference'}
                    onSampleDelete={noop}
                    samplesPH={tab}
                />,
                div
            );
        });

        expect(pretty(div.innerHTML)).toMatchInlineSnapshot(`
            "<a href=\\"reference\\">Collect Data</a>
            <ul>
              <div>loading</div>
            </ul>"
        `); /* ... gets filled automatically by jest ... */
    });
});

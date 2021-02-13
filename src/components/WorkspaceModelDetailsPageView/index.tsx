import { Promised, PromisePack } from 'lib/hooks/Promise';
import React from 'react';

type ModelDetails = {
    name: string,
    perf: {
        headers: string[],
        labels: {
            name: string,
            metrics: { key: string, data: number }[]
        }[]
    },
    pars: {
        imputation: string,
        features: string[],
        normalizer: string,
        classifier: string,
        hyperparameters: { name: string, value: any }[]
    }
};

export type WorkspaceModelDetailsPageViewProps = {
    modelDetailsPH: PromisePack<ModelDetails>,
}

const WorkspaceModelDetailsPageView = ({
    modelDetailsPH,
}: WorkspaceModelDetailsPageViewProps) => <>
    <header><Promised promise={modelDetailsPH} pending={'loading...'} >{({ name }) => name}</Promised></header>
    <section>
        <header>Performance Metrics</header>
        <table>
            <thead>
                <tr>
                    <td>#</td>
                    <Promised promise={modelDetailsPH} pending={<th>loading...</th>} >{({ perf: { headers } }) => headers.map(h => 
                        <th key={h} >{h}</th>
                    )}</Promised>
                </tr>
            </thead>
            <tbody>
                <Promised promise={modelDetailsPH} pending={
                    <tr>
                        <th>loading...</th>
                        <td>loading...</td>
                    </tr>
                }>{({ perf: { labels } }) => labels.map(({ name, metrics }) =>
                        <tr key={name} >
                            <th>{name}</th>
                            {metrics.map(({ key, data }) => 
                                <td key={key} >{data}</td>)}
                        </tr>)}
                </Promised>
            </tbody>
        </table>
    </section>
    <section>
        <header>Model Parameters</header>
        <ul>
            <li>
                <em>Imputation:</em>
                <span>
                    <Promised promise={modelDetailsPH} pending={'loading...'} >{({ pars: { imputation } }) => imputation}</Promised>
                </span>
            </li>
            <li>
                <em>Feature Extraction:</em>
                <span>
                    <Promised promise={modelDetailsPH} pending={'loading...'} >{({ pars: { features } }) => features.join(', ')}</Promised>
                </span>
            </li>
            <li>
                <em>Normalizer:</em>
                <span>
                    <Promised promise={modelDetailsPH} pending={'loading...'} >{({ pars: { normalizer } }) => normalizer}</Promised>
                </span>
            </li>
            <li>
                <em>Classifier:</em>
                <span>
                    <Promised promise={modelDetailsPH} pending={'loading...'} >{({ pars: { classifier } }) => classifier}</Promised>
                </span>
            </li>
            <li>
                <em>Hyperparameters:</em>
                <ul>
                    <Promised promise={modelDetailsPH} pending={<li>loading...</li>} >{({ pars: { hyperparameters: h } }) =>
                        h.map(({ name, value }) => <li key={name}>
                            {name} = {value}
                        </li>)
                    }</Promised>
                </ul>
            </li>
        </ul>
    </section>
</>;

export default WorkspaceModelDetailsPageView;
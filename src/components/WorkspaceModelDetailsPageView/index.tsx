import { Heading, majorScale, Pane, Table, Text } from 'evergreen-ui';
import { Promised, PromisePack } from 'lib/hooks/Promise';
import React from 'react';

export type ModelDetails = {
    name: string,
    perf: {
        headers: string[],
        labels: {
            name: string,
            metrics: { key: string, data: number }[]
        }[]
    },
    pars: {
        perComponentConfigs: {
            sensor: string,
            component: string,
            imputation: string,
            features: string[],
            normalizer: string,

        }[]
        classifier: string,
        hyperparameters: { name: string, value: any }[]
    },
};

export type WorkspaceModelDetailsPageViewProps = {
    modelDetailsPH: PromisePack<ModelDetails>,
}

const WorkspaceModelDetailsPageView = ({
    modelDetailsPH,
}: WorkspaceModelDetailsPageViewProps) => {
    console.log(modelDetailsPH);
    return <Pane display="flex" flexDirection="column" alignItems="center" paddingBottom={majorScale(2)}>
        <Pane minWidth={majorScale(120)} display="flex" flexDirection="column" gap={majorScale(2)} alignItems="start">
            <Heading>Performance Metrics</Heading>
            <Table minWidth={majorScale(120)} elevation={1}>
                <Table.Head>
                    <Table.TextHeaderCell>Label</Table.TextHeaderCell>
                    <Promised promise={modelDetailsPH} pending={<Table.TextHeaderCell>loading...</Table.TextHeaderCell>} >{({ perf: { headers } }) => headers.map(h => 
                        <Table.TextHeaderCell key={h} >{h}</Table.TextHeaderCell>
                    )}</Promised>
                </Table.Head>
                <Table.Body>
                    <Promised promise={modelDetailsPH} pending={
                        <Table.Row>
                            <Table.TextCell>loading...</Table.TextCell>
                            <Table.TextCell>loading...</Table.TextCell>
                        </Table.Row>
                    }>{({ perf: { labels } }) => labels.map(({ name, metrics }) =>
                            <Table.Row key={name} >
                                <Table.TextCell>{name}</Table.TextCell>
                                {metrics.map(({ key, data }) => 
                                    <Table.TextCell key={key} >{data}</Table.TextCell>)}
                            </Table.Row>)}
                    </Promised>
                </Table.Body>
            </Table>
            <Heading>Model Parameters</Heading>
            <Heading size={400}>Classifier:</Heading>
            <Text>
                <Promised promise={modelDetailsPH} pending={'loading...'} >{({ pars: { classifier } }) => classifier}</Promised>
            </Text>
            <Heading size={400}>Hyperparameters:</Heading>
            <Pane display="flex" flexDirection="column">
                <Promised promise={modelDetailsPH} pending={<Pane>loading...</Pane>} >{({ pars: { hyperparameters: h } }) =>
                    h.map(({ name, value }) =>
                        <Text key={name}>{name} = {value}</Text>
                    )
                }</Promised>
            </Pane>
            <Heading>Sensor Parameters</Heading>
            <Pane display="flex" flexDirection="column" gap={majorScale(1)}>
                <Promised promise={modelDetailsPH} pending={<Pane>loading...</Pane>}>{({ pars: { perComponentConfigs } }) =>
                    perComponentConfigs.map(({ sensor, component, imputation, features, normalizer }) =>
                        <Pane display="flex" flexDirection="column">
                            <Heading size={400}>{sensor}, {component}</Heading>
                            <Text>Imputation = {imputation}</Text>
                            <Text>Normalization = {normalizer}</Text>
                            <Text>Features = {features.join(', ')}</Text>
                        </Pane>
                    )
                }</Promised>
            </Pane>
        </Pane>
    </Pane>;
};

export default WorkspaceModelDetailsPageView;
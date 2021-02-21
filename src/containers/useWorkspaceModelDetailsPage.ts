import { WorkspaceModelDetailsPageViewProps } from 'components/WorkspaceModelDetailsPageView';
import { useAPI, useAuth, usePromise } from 'lib/hooks';
import { useHeader } from 'lib/hooks/Header';

const useWorkspaceModelDetailsPage = (workspaceId: string, modelId: string): WorkspaceModelDetailsPageViewProps => {
    useHeader({ workspaceId, modelId, dangle: 'Details' });
    useAuth();
    const api = useAPI();

    const modelDetailsPH = usePromise(async() => {
        const { name, labelPerformance, classifier, ...rest } = await api.getModelDetails(workspaceId, modelId);
        
        const pars = { ...rest, classifier: classifier.name, 
            hyperparameters: classifier.hyperparameters.map(({ name, value }) => ({ name, value: value.toString() }))
        };

        // this shouldn't be necessary as each label entry should provide the same set of values
        const headers = Array.from(labelPerformance.reduce((agg, { metrics }) => {
            for (const { name } of metrics) {
                agg.add(name);
            }

            return agg;
        }, new Set<string>()));

        const labels = labelPerformance.map(({ label, metrics }) => ({
            name: label,
            metrics: metrics.map(({ name, score }) => ({ key: name, data: score }))
        }));

        const perf = {
            headers,
            labels
        };

        return { pars, name, perf };
    }, []);

    return { modelDetailsPH };
}; 

export default useWorkspaceModelDetailsPage;
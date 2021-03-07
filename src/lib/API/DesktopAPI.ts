import { SamplingRate, SensorName } from 'lib/sensors';
import { UnixTimestamp } from 'lib/utils';
import { del, get, post, put } from './utils';

import testparams from './params.json';

type Username = string;
type Password = string;
type Email = string;
type WorkspaceID = string;
type SampleID = string;
type ModelID = string;
export type LabelID = string;
type SensorID = string;
// type DataFormat = string[];
export type Data = number[];

export enum HyperparameterType {
    Constant,
    Integer,
    Double,
    Select
}

type Hyperparameter = {
    type: HyperparameterType.Integer,
    lower: number,
    upper: number,
    default: number,
} | {
    type: HyperparameterType.Double,
    lower: number,
    upper: number,
    default: number,
} | {
    type: HyperparameterType.Select,
    choices: string[],
    default: string,
} | {
    type: HyperparameterType.Constant,
    value: string,
};

interface ClassifierOptions {
    hyperparameters: Record<string, Hyperparameter>,
    conditions: string[]
}

export interface TrainingParameters {
    features: string[],
    imputers: string[],
    normalizers: string[],
    classifiers: string[],
    classifierOptions: Record<string, ClassifierOptions> 
}

// interface ModelOptions {
//     name: string,
//     features: string[],
//     imputation: string,
//     normalizer: string,
//     classifier: ClassifierOptions
// }

export interface SensorOptions {
    sensorName: SensorName,
    samplingRate: SamplingRate,
}

interface Timeframe {
    start: UnixTimestamp;
    end: UnixTimestamp;
}

interface IWorkspace {
    id: WorkspaceID,
    name: string
}

interface ISensor {
    id: SensorID,
    name: SensorName,
    samplingRate: SamplingRate,
    // dataFormat: DataFormat // FIXME tell backend that we hardcode this in frontend
}

interface ILabel {
    labelId: LabelID,
    name: string,
    description: string,
    sampleCount: number
}

interface IDatapoint {
    timestamp: UnixTimestamp,
    data: Data
}

export interface ISensorDatapoints {
    sensorName: SensorName,
    dataPoints: IDatapoint[]
}

interface ISample {
    label: string,
    start: UnixTimestamp,
    end: UnixTimestamp,
    data: ISensorDatapoints[]
}

interface IModel {
    id: ModelID,
    name: string,
}

interface IMetric { name: string, score: number };

interface ILabelPerformance {
    label: string,
    metrics: IMetric[]
}

interface IHyperparameter {
    name: string,
    value: any
}

interface IClassifier {
    name: string,
    hyperparameters: IHyperparameter[]
}

interface IModelDetails {
    name: string,
    labelPerformance: ILabelPerformance[],
    imputation: string,
    normalizer: string,
    features: string[],
    classifier: IClassifier
}

export interface DesktopAPI {
    login(username: Username, password: Password): Promise<boolean>;
    logout(): void;
    signup(username: Username, password: Password, email: Email): Promise<void>;
    isAuthenticated(): boolean,
    getAvailableTrainingParameters(): Promise<TrainingParameters>;
    // train(options: ModelOptions): Promise<boolean>;
    getTrainingProgress(): Promise<number>;
    getWorkspaces(): Promise<IWorkspace[]>;
    createWorkspace(name: string, sensors: SensorOptions[]): Promise<boolean>;
    getWorkspaceSensors(): Promise<ISensor[]>;
    getSampleIds(w: WorkspaceID): Promise<SampleID[]>;
    deleteSample(w: WorkspaceID, sample: string): Promise<void>; 
    getDataCollectionID(w: WorkspaceID): Promise<string>;
    getPredictionID(w: WorkspaceID, m: ModelID): Promise<string>;
    getLabels(w: WorkspaceID): Promise<ILabel[]>;
    deleteWorkspace(w: WorkspaceID): Promise<void>;
    createLabel(w: WorkspaceID, labelName: string): Promise<void>;
    renameLabel(w: WorkspaceID, l: LabelID, name: string): Promise<void>;
    describeLabel(w: WorkspaceID, l: LabelID, desc: string): Promise<void>;
    deleteLabel(w: WorkspaceID, l: LabelID): Promise<void>;
    getSampleDetails(w: WorkspaceID, s: SampleID): Promise<ISample>;
    setSampleLabel(w: WorkspaceID, s: SampleID, l: LabelID): Promise<void>;
    setSampleTimeframe(w: WorkspaceID, s: SampleID, frame: Timeframe): Promise<void>;
    getModels(w: WorkspaceID): Promise<IModel[]>;
    getModelDetails(w: WorkspaceID, m: ModelID): Promise<IModelDetails>;
    renameModel(w: WorkspaceID, m: ModelID, name: string): Promise<void>;
    deleteModel(w: WorkspaceID, m: ModelID): Promise<void>;
}

export default class SameOriginDesktopAPI implements DesktopAPI {
    private accessToken: string | undefined = undefined;
    private refreshToken: string | undefined = undefined;
    
    private get<T,>(url: string): Promise<T> {
        return get(this.accessToken)<T>(url);
    };
    private delete<T,>(url: string) {
        return del(this.accessToken)<T>(url);
    }
    private put<T,Y>(url: string, data: T) {
        return put(this.accessToken)<T,Y>(url, data);
    }
    private post<T,Y>(url: string, data: T) {
        return post(this.accessToken)<T,Y>(url, data);
    }
    
    async login(username: Username, password: Password): Promise<boolean> {
        try {
            ({
                accessToken: this.accessToken,
                refreshToken: this.refreshToken
            } = await post()('/auth/login', { username, passwordHash: password })); // we are using tls, so skip hashing on the client
            return this.isAuthenticated();
        } catch(e) {
            return false;
        }
    }

    logout() {
        this.accessToken = undefined;
        this.refreshToken = undefined;
        window.location.reload();
    }
    
    async signup(username: Username, password: Password, email: Email): Promise<void> {
        await post()('/auth/signup', { username, passwordHash: password, email });
        return;
    }
    
    isAuthenticated(): boolean {
        return !!this.accessToken;
    }
    
    async getAvailableTrainingParameters(): Promise<TrainingParameters> {
        type JSONIngest = {
            classifier_selections: {
                classifier: string,
                hyperparameters: Record<string, {
                    type: 'UniformIntegerHyperparameter',
                    lower: number,
                    upper: number,
                    default_value: number,
                } | {
                    type: 'UniformFloatHyperparameter',
                    lower: number,
                    upper: number,
                    default_value: number,
                } | {
                    type: 'CategoricalHyperparameter',
                    choices: string[],
                    default_value: string,
                } | {
                    type: 'Constant',
                    value: string,
                }>,
                conditions: string[]
            }[]
            features: string[],
            imputers: string[],
            normalizers: string[],
        }

        // return await this.get<JSONIngest>('/api/parameters'); // FIXME, substitute test params
        const params =  testparams as unknown as JSONIngest;

        const { features, imputers, normalizers, classifier_selections } = params;

        const options = classifier_selections.reduce<Record<string, ClassifierOptions>>((agg, cur) => {
            const hyperparameters: Record<string, Hyperparameter> = {};
            for (const [k, v] of Object.entries(cur.hyperparameters)) {
                switch(v.type) {
                case 'UniformIntegerHyperparameter':
                    hyperparameters[k] = {
                        type: HyperparameterType.Integer,
                        lower: v.lower,
                        upper: v.upper,
                        default: v.default_value
                    };
                    break;
                case 'UniformFloatHyperparameter':
                    hyperparameters[k] = {
                        type: HyperparameterType.Double,
                        lower: v.lower,
                        upper: v.upper,
                        default: v.default_value
                    };
                    break;
                case 'CategoricalHyperparameter':
                    hyperparameters[k] = {
                        type: HyperparameterType.Select,
                        choices: v.choices,
                        default: v.default_value
                    };
                    break;
                case 'Constant':
                    hyperparameters[k] = {
                        type: HyperparameterType.Constant,
                        value: v.value
                    };
                    break;
                }
            }

            agg[cur.classifier] = {
                conditions: cur.conditions,
                hyperparameters
            };

            return agg;
        }, {});

        return {
            features,
            imputers,
            normalizers,
            classifiers: classifier_selections.map(v => v.classifier),
            classifierOptions: options
        };
    }


    // train(options: ModelOptions): Promise<boolean> {
    //     throw new Error('Method not implemented.');
    // }
    getTrainingProgress(): Promise<number> {
        throw new Error('Method not implemented.');
    }
    
    async getWorkspaces(): Promise<IWorkspace[]> {
        console.log(this.accessToken);
        return await this.get<IWorkspace[]>('/api/workspaces');
    }
    
    async createWorkspace(name: string, sensors: SensorOptions[]): Promise<boolean> {
        return await this.post('/api/workspaces/create', { name, sensors });
    }
    
    getWorkspaceSensors(): Promise<ISensor[]> {
        throw new Error('Method not implemented.');
    }
    
    async getSampleIds(w: WorkspaceID): Promise<SampleID[]> {
        return (await this.get<{sampleId: string}[]>(`/api/workspaces/${w}/samples?showDataPoints=false`)).map(v => v.sampleId);
    }
    
    async deleteSample(w: WorkspaceID, sample: string): Promise<void> {
        return await this.delete(`/api/workspaces/${w}/samples/${sample}`);
    }
    
    async getDataCollectionID(w: WorkspaceID): Promise<string> {
        return await this.get<string>(`/api/workspaces/${w}/generateSubmissionId`);
    }
    
    async getPredictionID(w: WorkspaceID, m: ModelID): Promise<string> {
        return await this.get<string>(`/api/workspaces/${w}/models/${m}/predictionId`);
    }
    
    async getLabels(w: WorkspaceID): Promise<ILabel[]> {
        return await this.get<ILabel[]>(`/api/workspaces/${w}/labels`);
    }
    
    deleteWorkspace(w: WorkspaceID): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
    async createLabel(w: WorkspaceID, labelName: string): Promise<void> {
        return await this.post(`/api/workspaces/${w}/labels/create`, { name: labelName });
    }
    
    async renameLabel(w: WorkspaceID, l: LabelID, name: string): Promise<void> {
        return await this.put(`/api/workspaces/${w}/labels/${l}/rename`, { name });
    }
    
    async describeLabel(w: WorkspaceID, l: LabelID, desc: string): Promise<void> {
        return await this.put(`/api/workspaces/${w}/labels/${l}/describe`, { description: desc });
    }
    
    async deleteLabel(w: WorkspaceID, l: LabelID): Promise<void> {
        return await this.delete(`/api/workspaces/${w}/labels/${l}`);
    }
    
    async getSampleDetails(w: WorkspaceID, s: SampleID): Promise<ISample> {
        const { label, start, end, sensorDataPoints } = await this.get<{
            label: string,
            start: number,
            end: number,
            sensorDataPoints: ISensorDatapoints[]
        }>(`/api/workspaces/${w}/samples/${s}`);
        return { label, start, end, data: sensorDataPoints };
    }

    async setSampleLabel(w: string, s: string, labelId: LabelID): Promise<void> {
        return await this.put(`/api/workspaces/${w}/samples/${s}/relabel?labelId=${labelId}`, undefined);
    }
    setSampleTimeframe(w: string, s: string, frame: Timeframe): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async getModels(w: string): Promise<IModel[]> {
        const list = await this.get<{ modelId: string, name: string }[]>(`/api/workspaces/${w}/models`);
        return list.map(({ modelId: id, name }) => ({ id, name }));
    }
    
    async getModelDetails(w: string, m: string): Promise<IModelDetails> {
        const { label_performance_metrics: labelPerformance, ...rest } = await this.get<{
            name: string,
            label_performance_metrics: {
                label: string,
                performance_metrics: IMetric[]
            }[],
            imputation: string,
            normalizer: string,
            features: string[],
            classifier: IClassifier
        }>(`/api/workspaces/${w}/models/${m}`);

        return { ...rest, labelPerformance: labelPerformance.map(({ label, performance_metrics: metrics }) => ({ label, metrics })) };
    }

    async renameModel(w: string, m: string, name: string): Promise<void> {
        return await this.put(`/api/workspaces/${w}/models/${m}`, { name });
    }

    async deleteModel(w: string, m: string): Promise<void> {
        return await this.delete(`/api/workspaces/${w}/models/${m}`);
    }
}

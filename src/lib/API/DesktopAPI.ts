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
    classifierOptions: Record<string, ClassifierOptions>,
    windowSize: number,
    slidingStep: number,
}

interface ModelOptions {
    modelName: string,
    imputation: string,
    features: string[],
    normalizer: string,
    classifier: string,
    windowSize: number,
    slidingStep: number,
    hyperparameters: any // FIXME wot
}

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
    data: ISensorDatapoints[],
    timeframes: Timeframe[]
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

interface IModelDetails {
    name: string,
    labelPerformance: ILabelPerformance[],
    imputation: string,
    normalizer: string,
    features: string[],
    classifier: string,
    hyperparameters: IHyperparameter[],
}

export interface DesktopAPI {
    login(username: Username, password: Password): Promise<void>;
    logout(): void;
    signup(username: Username, password: Password, email: Email): Promise<void>;
    isAuthenticated(): boolean,
    getAvailableTrainingParameters(): Promise<TrainingParameters>;
    train(w: WorkspaceID, options: ModelOptions): Promise<void>;
    getTrainingProgress(w: WorkspaceID): Promise<number>;
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
    setSampleTimeframe(w: WorkspaceID, s: SampleID, frames: Timeframe[]): Promise<void>;
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
    
    async login(username: Username, password: Password): Promise<void> {
        ({
            accessToken: this.accessToken,
            refreshToken: this.refreshToken
        } = await post()('/auth/login', { username, passwordHash: password })); // we are using tls, so skip hashing on the client
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
            windowSize: number,
            slidingStep: number,
        }

        // const params = await this.get<JSONIngest>('/api/parameters'); // FIXME, substitute test params
        const params =  testparams as unknown as JSONIngest;

        const { features, imputers, normalizers, classifier_selections, windowSize, slidingStep } = params;

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
            classifierOptions: options,
            windowSize,
            slidingStep
        };
    }

    async train(w: WorkspaceID, opt: ModelOptions): Promise<void> {
        return await this.post<ModelOptions, void>(`/api/workspaces/${w}/train`, opt);
    }

    async getTrainingProgress(w: WorkspaceID): Promise<number> {
        const { progress } = await this.get<{ progress: number }>(`/api/workspaces/${w}/trainingProgress`);
        return progress;
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
        const { label, start, end, sensorDataPoints, timeFrames } = await this.get<{
            label: string,
            start: number,
            end: number,
            sensorDataPoints: ISensorDatapoints[],
            timeFrames: Timeframe[]
        }>(`/api/workspaces/${w}/samples/${s}`);
        return { label, start, end, data: sensorDataPoints, timeframes: timeFrames };
    }

    async setSampleLabel(w: string, s: string, labelId: LabelID): Promise<void> {
        return await this.put(`/api/workspaces/${w}/samples/${s}/relabel?labelId=${labelId}`, undefined);
    }

    async setSampleTimeframe(w: string, s: string, frames: Timeframe[]): Promise<void> {
        return await this.put<{ start: number, end: number }[], void>(`/api/workspaces/${w}/samples/${s}/timeframes`, frames);
    }

    async getModels(w: string): Promise<IModel[]> {
        const list = await this.get<{ id: string, name: string }[]>(`/api/workspaces/${w}/models`);
        return list.map(({ id, name }) => ({ id, name }));
    }
    
    async getModelDetails(w: string, m: string): Promise<IModelDetails> {
        const {
            sortedFeatures: features,
            normalization: normalizer,
            labelPerformanceMetrics: labelPerformance,
            ...rest
        } = await this.get<{
            name: string,
            labelPerformanceMetrics: {
                label: string,
                metrics: IMetric[]
            }[],
            imputation: string,
            normalization: string,
            sortedFeatures: string[],
            classifier: string,
            hyperparameters: IHyperparameter[],
            windowSize: number,
            slidingStep: number
        }>(`/api/workspaces/${w}/models/${m}`);

        return { ...rest, normalizer, features,
            labelPerformance: labelPerformance.map(({ label, metrics }) => ({ label, metrics }))
        };
    }

    async renameModel(w: string, m: string, name: string): Promise<void> {
        return await this.put(`/api/workspaces/${w}/models/${m}`, { name });
    }

    async deleteModel(w: string, m: string): Promise<void> {
        return await this.delete(`/api/workspaces/${w}/models/${m}`);
    }
}

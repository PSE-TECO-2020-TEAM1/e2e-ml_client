import { SamplingRate, SensorName } from 'lib/sensors';

export type Username = string;
export type Password = string;
export type Email = string;
export type WorkspaceID = string;
export type SampleID = string;
export type ModelID = string;
export type LabelID = string;
export type SensorID = string;
export type UnixTimestamp = number;
export type DataFormat = string[];
export type Data = number[];

export interface HyperparameterOptions {
    name: string,
    format: string
}

export interface ClassifierOptions {
    name: string,
    hyperparameters: HyperparameterOptions[]
}

export interface TrainingParameters {
    classifier: ClassifierOptions[]
}

export interface ModelOptions {
    name: string,
    features: string[],
    imputation: string,
    normalizer: string,
    classifier: ClassifierOptions
}

export interface SensorOptions {
    sensorName: SensorName,
    samplingRate: SamplingRate,
}

export interface Timeframe {
    start: UnixTimestamp;
    end: UnixTimestamp;
}

export interface IWorkspace {
    id: WorkspaceID,
    name: string
}

export interface ISensor {
    id: SensorID,
    name: SensorName,
    samplingRate: SamplingRate,
    dataFormat: DataFormat
}

export interface ILabel {
    labelId: LabelID,
    name: string,
    description: string,
    sampleCount: number
}

export interface IDatapoint {
    timestamp: UnixTimestamp,
    data: Data
}

export interface ISensorDatapoints {
    sensorId: SensorID,
    datapoints: IDatapoint[]
}

export interface ISample {
    label: ILabel,
    start: UnixTimestamp,
    end: UnixTimestamp,
    data: ISensorDatapoints[]
}

export interface IModel {
    id: ModelID,
    name: string,
}

export type IMetric = { name: string, score: number };

export type ILabelPerformance = {
    label: string,
    metrics: IMetric[]
}

export interface IHyperparameter {
    name: string,
    value: any
}

export interface IClassifier {
    name: string,
    hyperparameters: IHyperparameter[]
}

export interface IModelDetails {
    name: string,
    labelPerformance: ILabelPerformance[],
    imputation: string,
    normalizer: string,
    features: string[],
    classifier: IClassifier
}

export interface API {
    login(username: Username, password: Password): Promise<boolean>;
    signup(username: Username, password: Password, email: Email): Promise<void>;
    isAuthenticated(): boolean,
    getAvailableTrainingParameters(): Promise<TrainingParameters>;
    train(options: ModelOptions): Promise<boolean>;
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

export default class SameOriginAPI implements API {
    private accessToken: string | null = null;
    private refreshToken: string | null = null;
    
    private get = async <T,>(url: string, noauth: boolean = false, method: string = 'GET'): Promise<T> => {
        const headers: HeadersInit = new Headers();
        noauth = false; // FIXME: waiting for enes to fix swagger
        if (!noauth) headers.set('Authorization', `Bearer ${this.accessToken}`);
        
        const res = await fetch(url, {
            method,
            headers,
        });
        
        const body = await res.text();
        
        if (res.status === 200 && body === '') return JSON.parse('{}');
        return JSON.parse(body);
    }
    
    private delete = <T,>(url: string) => this.get<T>(url, undefined, 'DELETE');
    private put = <T,Y>(url: string, data: T) => this.post<T,Y>(url, data, undefined, 'PUT');
    
    private post = async <Input,Output>(url: string, data: Input, noauth: boolean = false, method: string = 'POST'): Promise<Output> => {
        const headers: HeadersInit = new Headers();
        headers.set('Content-Type', 'application/json');
        noauth = false; // FIXME: waiting for enes to fix swagger
        if (!noauth) headers.set('Authorization', `Bearer ${this.accessToken}`);
        
        const res = await fetch(url, {
            method: method,
            headers,
            body: JSON.stringify(data)
        });
        
        const body = await res.text();
        
        if (res.status === 200 && body === '') return JSON.parse('{}');
        return JSON.parse(body);
    }
    
    async login(username: Username, password: Password): Promise<boolean> {
        try {
            ({
                access_token: this.accessToken,
                refresh_token: this.refreshToken
            } = await this.post('/auth/login', { username, passwordHash: password }, true)); // FIXME: eeh we are using tls, so skip hashing on the client
            return this.isAuthenticated();
        } catch(e) {
            return false;
        }
    }
    
    async signup(username: Username, password: Password, email: Email): Promise<void> {
        await this.post('/auth/signup', { username, passwordHash: password, email }, true);
        return;
    }
    
    isAuthenticated(): boolean {
        return !!this.accessToken;
    }
    
    getAvailableTrainingParameters(): Promise<TrainingParameters> {
        throw new Error('Method not implemented.');
    }
    train(options: ModelOptions): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    getTrainingProgress(): Promise<number> {
        throw new Error('Method not implemented.');
    }
    
    async getWorkspaces(): Promise<IWorkspace[]> {
        return await this.get<IWorkspace[]>('/api/workspaces');
    }
    
    async createWorkspace(name: string, sensors: SensorOptions[]): Promise<boolean> {
        return await this.post('/api/workspaces/create', { name, sensors });
    }
    
    getWorkspaceSensors(): Promise<ISensor[]> {
        throw new Error('Method not implemented.');
    }
    
    async getSampleIds(w: WorkspaceID): Promise<SampleID[]> {
        return await this.get<SampleID[]>(`/api/workspaces/${w}/samples?onlyIDs=true`);
    }
    
    async deleteSample(w: WorkspaceID, sample: string): Promise<void> {
        return await this.delete(`/api/workspaces/${w}/samples/${sample}`);
    }
    
    async getDataCollectionID(w: WorkspaceID): Promise<string> {
        return await this.get<string>(`/api/workspaces/${w}/submissionId`);
    }
    
    getPredictionID(w: WorkspaceID, m: ModelID): Promise<string> {
        throw new Error('Method not implemented.');
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
    
    getSampleDetails(w: WorkspaceID, s: SampleID): Promise<ISample> {
        throw new Error('Method not implemented.');
    }

    setSampleLabel(w: string, s: string, l: string): Promise<void> {
        throw new Error('Method not implemented.');
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

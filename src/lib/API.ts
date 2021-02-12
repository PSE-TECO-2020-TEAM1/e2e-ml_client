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

export interface Hyperparameter {
    name: string,
    format: string
}

export interface Classifier {
    name: string,
    hyperparameters: Hyperparameter[]
}

export interface TrainingParameters {
    classifier: Classifier[]
}

export interface ModelOptions {
    name: string,
    features: string[],
    imputation: string,
    normalizer: string,
    classifier: Classifier
}

export interface SensorOptions {
    sensorName: SensorName,
    samplingRate: SamplingRate,
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
    
    private post = async <T,>(url: string, data: Object, noauth: boolean = false): Promise<T> => {
        const headers: HeadersInit = new Headers();
        headers.set('Content-Type', 'application/json');
        noauth = false; // FIXME: waiting for enes to fix swagger
        if (!noauth) headers.set('Authorization', `Bearer ${this.accessToken}`);
        
        const res = await fetch(url, {
            method: 'POST',
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
        return this.post('/api/workspaces/create', { name, sensors });
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
    
    getPredictionID(w: string, m: string): Promise<string> {
        throw new Error('Method not implemented.');
    }
    
    async getLabels(w: string): Promise<ILabel[]> {
        return await this.get<ILabel[]>(`/api/workspaces/${w}/labels`);
    }
    
    deleteWorkspace(w: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
    createLabel(w: string, labelName: string): Promise<void> {
        return this.post(`/api/workspaces/${w}/labels/create`, { name: labelName });
    }
    
    renameLabel(w: string, l: string, name: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
    describeLabel(w: string, l: string, desc: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
    deleteLabel(w: string, l: string): Promise<void> {
        return this.delete(`/api/workspaces/${w}/labels/${l}`);
    }
    
    getSampleDetails(w: string, s: string): Promise<ISample> {
        throw new Error('Method not implemented.');
    }
}

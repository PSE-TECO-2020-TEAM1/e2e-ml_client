import { SamplingRate, SensorName } from 'lib/sensors';

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

export interface IModelOptions {
    name: string,
    features: string[],
    imputation: string,
    normalizer: string,
    classifier: Classifier
}

export interface IWorkspace {
    id: string,
    name: string
}

export interface ISensor {
    sensorName: SensorName
    samplingRate: SamplingRate,
}

export interface API {
    login(username: string, password: string): Promise<boolean>,
    signup(username: string, password: string, email: string): Promise<void>,
    isAuthenticated(): boolean,
    getAvailableTrainingParameters(): Promise<TrainingParameters>,
    train(options: IModelOptions): Promise<boolean>,
    getTrainingProgress(): Promise<number>,
    getWorkspaces(): Promise<IWorkspace[]>,
    createWorkspace(name: string, sensors: ISensor[]): Promise<boolean>
}

export default class SameOriginAPI implements API {
    private accessToken: string | null = null;
    private refreshToken: string | null = null;
    
    private get = async <T,>(url: string, noauth: boolean = false): Promise<T> => {
        const headers: HeadersInit = new Headers();
        noauth = false; // FIXME: waiting for enes to fix swagger
        if (!noauth) headers.set('Authorization', `Bearer ${this.accessToken}`);

        const res = await fetch(url, {
            method: 'GET',
            headers,
        });
        
        const body = await res.text();
        
        if (res.status === 200 && body === '') return JSON.parse('{}');
        return JSON.parse(body);
    }

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
    
    async login(username: string, password: string): Promise<boolean> {
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
    
    async signup(username: string, password: string, email: string): Promise<void> {
        await this.post('/auth/signup', { username, passwordHash: password, email }, true);
        return;
    }

    isAuthenticated(): boolean {
        return !!this.accessToken;
    }
    
    getAvailableTrainingParameters(): Promise<TrainingParameters> {
        throw new Error('Method not implemented.');
    }
    train(options: IModelOptions): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    getTrainingProgress(): Promise<number> {
        throw new Error('Method not implemented.');
    }
    
    async getWorkspaces(): Promise<IWorkspace[]> {
        return await this.get<IWorkspace[]>('/api/workspaces');
    }

    async createWorkspace(name: string, sensors: ISensor[]): Promise<boolean> {
        return this.post('/api/workspaces/create', { name, sensors });
    }
}

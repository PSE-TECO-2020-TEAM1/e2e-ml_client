import { ISensorDatapoints, LabelID, UnixTimestamp } from './DesktopAPI';
import { post as postRaw, get as getRaw } from './utils';

type SubmissionID = string;
type PredictionID = string;

interface Label {
    description: string,
    name: string,
}

interface Sensor {
    name: string,
    samplingRate: number
}

export interface ISubmissionConfiguration {
    labels: Label[],
    sensors: Sensor[]
}

export interface IPredictionConfiguration {
    sensors: Sensor[]
}

export interface MobileAPI {
    submitSample(id: SubmissionID, label: LabelID, start: UnixTimestamp, end: UnixTimestamp, data: ISensorDatapoints[]): Promise<void>;
    getSubmissionConfiguration(id: SubmissionID): Promise<ISubmissionConfiguration>;
    discardSubmission(id: SubmissionID): Promise<void>;
    getPredictionConfiguration(id: PredictionID): Promise<IPredictionConfiguration>;
}

const post = postRaw();
const get = getRaw();

class SameOriginMobileAPI implements MobileAPI {
    submitSample(id: string, label: string, start: number, end: number, data: ISensorDatapoints[]): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async getSubmissionConfiguration(id: string): Promise<ISubmissionConfiguration> {
        return get<ISubmissionConfiguration>('/api/submissionConfig');
    }
    discardSubmission(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getPredictionConfiguration(id: string): Promise<IPredictionConfiguration> {
        throw new Error('Method not implemented.');
    }
    
}

export default SameOriginMobileAPI;
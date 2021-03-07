import { SensorName } from 'lib/sensors';
import { UnixTimestamp } from 'lib/utils';
import { Data, LabelID } from './DesktopAPI';
import { post as postRaw, get as getRaw } from './utils';

type SubmissionID = string;
type PredictionID = string;

interface Label {
    description: string,
    name: string,
}

interface Sensor {
    name: SensorName,
    samplingRate: number
}

export interface ISubmissionConfiguration {
    labels: Label[],
    sensors: Sensor[]
}

export interface IPredictionConfiguration {
    sensors: Sensor[]
}

interface Datapoint {
    timestamp: UnixTimestamp,
    data: Data
}

interface SensorDatapoints {
    sensor: SensorName,
    dataPoints: Datapoint[]
}

export interface MobileAPI {
    submitSample(id: SubmissionID, label: LabelID, start: UnixTimestamp, end: UnixTimestamp, data: SensorDatapoints[]): Promise<void>;
    getSubmissionConfiguration(id: SubmissionID): Promise<ISubmissionConfiguration>;
    // discardSubmission(id: SubmissionID): Promise<void>;
    getPredictionConfiguration(id: PredictionID): Promise<IPredictionConfiguration>;
}

const post = postRaw();
const get = getRaw();

class SameOriginMobileAPI implements MobileAPI {
    async submitSample(id: string, label: string, start: number, end: number, data: SensorDatapoints[]): Promise<void> {
        const toSend = {
            submissionId: id,
            label,
            start,
            end,
            sensorDataPoints: data
        };
        console.log('toSend: ', toSend);
        return await post('/api/submitSample', toSend);
    }
    async getSubmissionConfiguration(id: string): Promise<ISubmissionConfiguration> {
        return get<ISubmissionConfiguration>(`/api/submissionConfig?submissionId=${id}`);
    }
    getPredictionConfiguration(id: string): Promise<IPredictionConfiguration> {
        throw new Error('Method not implemented.');
    }
    
}

export default SameOriginMobileAPI;
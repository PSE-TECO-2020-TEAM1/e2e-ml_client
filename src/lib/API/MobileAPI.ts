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

interface PredictionResult {
    predictions: string[], // labels
}

export interface MobileAPI {
    submitSample(id: SubmissionID, label: LabelID, start: UnixTimestamp, end: UnixTimestamp, data: SensorDatapoints[]): Promise<void>;
    getSubmissionConfiguration(id: SubmissionID): Promise<ISubmissionConfiguration>;
    // discardSubmission(id: SubmissionID): Promise<void>;
    getPredictionConfiguration(id: PredictionID): Promise<IPredictionConfiguration>;
    getPrediction(id: PredictionID): Promise<PredictionResult>;
    predict(id: PredictionID, data: SensorDatapoints[], start: UnixTimestamp, end: UnixTimestamp): Promise<void>;
}

const post = postRaw();
const get = getRaw();

class SameOriginMobileAPI implements MobileAPI {
    async predict(id: string, data: SensorDatapoints[], start: UnixTimestamp, end: UnixTimestamp): Promise<void> {
        const toSend = {
            predictionId: id,
            sensorDataPoints: data,
            start,
            end
        };
        return await post('/api/submitData', toSend);
    }

    getPrediction(id: string): Promise<PredictionResult> {
        return get<PredictionResult>(`/api/predictionResults?predictionId=${id}`);
    }

    async submitSample(id: string, label: string, start: number, end: number, data: SensorDatapoints[]): Promise<void> {
        const toSend = {
            submissionId: id,
            sensorDataPoints: data,
            start,
            end,
            label,
        };
        console.log('toSend: ', toSend);
        return await post('/api/submitSample', toSend);
    }
    async getSubmissionConfiguration(id: string): Promise<ISubmissionConfiguration> {
        return get<ISubmissionConfiguration>(`/api/submissionConfig?submissionId=${id}`);
    }
    
    getPredictionConfiguration(id: string): Promise<IPredictionConfiguration> {
        return get<IPredictionConfiguration>(`/api/predictionConfig?predictionId=${id}`);
    }
    
}

export default SameOriginMobileAPI;
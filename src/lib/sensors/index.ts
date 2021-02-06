import accelerometer from './accelerometer';

export type SensorName = 'Accelerometer' | 'Gyroscope' | 'Magnetometer';
export type SamplingRate = number;

export interface SensorConfiguration {
    name: SensorName,
    maxSamplingRate: SamplingRate,
    defaultSamplingRate: SamplingRate
}

const sensors: SensorConfiguration[] = [
    accelerometer
];

export default sensors;
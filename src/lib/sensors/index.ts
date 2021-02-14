import { UnixTimestamp } from 'lib/utils';
import { config as accelConfig, implementation as accelImpl } from './accelerometer';

export type SensorName = 'Accelerometer' | 'Gyroscope' | 'Magnetometer';
export type SamplingRate = number;
export type onReadCallback = (sample: { data: number[], timestamp: UnixTimestamp }) => void;

// couldn't find a way to automate this with Typescript
export const sensorNameArrayRecordGen = () => ({
    'Accelerometer': [],
    'Gyroscope': [],
    'Magnetometer': []
});

export interface SensorConfiguration {
    name: SensorName,
    maxSamplingRate: SamplingRate,
    defaultSamplingRate: SamplingRate
}

export interface SensorImplementation {
    start: () => void;
    onRead: (fn: onReadCallback) => void;
    stop: () => void;
}

export const sensorConfigurations: Record<SensorName, SensorConfiguration> = {
    'Accelerometer': accelConfig,
    'Gyroscope': accelConfig,
    'Magnetometer': accelConfig,
}; // FIXME implement all and remove this

export const sensorImplementations: Record<SensorName, SensorImplementation> = {
    'Accelerometer': accelImpl,
    'Gyroscope': accelImpl,
    'Magnetometer': accelImpl,
}; // FIXME implement all and remove this
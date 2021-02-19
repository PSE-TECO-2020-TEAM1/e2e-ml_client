import { UnixTimestamp } from 'lib/utils';
import { config as accelConfig, implementation as accelImpl } from './accelerometer';
import { config as gyroConfig, implementation as gyroImpl } from './gyroscope';
import { config as magConfig, implementation as magImpl } from './magnetometer';

export type SensorName = 'Gyroscope' | 'Accelerometer' | 'Magnetometer';
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
    defaultSamplingRate: SamplingRate,
    format: readonly string[]
}

export interface SensorImplementation {
    start: () => void;
    onRead: (fn: onReadCallback) => void;
    stop: () => void;
}

export const sensorConfigurations: Record<SensorName, SensorConfiguration> = {
    'Accelerometer': accelConfig,
    'Gyroscope': gyroConfig,
    'Magnetometer': magConfig,
}; // FIXME implement all and remove this

export const sensorImplementations: Record<SensorName, SensorImplementation> = {
    'Accelerometer': accelImpl,
    'Gyroscope': gyroImpl,
    'Magnetometer': magImpl,
}; // FIXME implement all and remove this
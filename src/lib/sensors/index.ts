import { UnixTimestamp } from 'lib/utils';
import { config as accelConfig, implementation as accelImpl, format as accelFormat } from './accelerometer';
import { config as gyroConfig, implementation as gyroImpl, format as gyroFormat } from './gyroscope';
import { config as magConfig, implementation as magImpl, format as magFormat } from './magnetometer';

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
}

export interface SensorImplementation {
    start: (samplingRate: number) => void;
    onRead: (fn: onReadCallback) => void;
    stop: () => void;
}

export const sensorFormats: Record<SensorName, readonly string[]> = {
    'Accelerometer': accelFormat,
    'Gyroscope': gyroFormat,
    'Magnetometer': magFormat,
};

export const sensorConfigurations: Record<SensorName, SensorConfiguration> = {
    'Accelerometer': accelConfig,
    'Gyroscope': gyroConfig,
    'Magnetometer': magConfig,
};

export const sensorImplementations: Record<SensorName, SensorImplementation> = {
    'Accelerometer': accelImpl,
    'Gyroscope': gyroImpl,
    'Magnetometer': magImpl,
};
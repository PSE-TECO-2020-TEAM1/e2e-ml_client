import { SensorConfiguration } from './index';

const accelerometer: SensorConfiguration = {
    name: 'Accelerometer',
    maxSamplingRate: 100,
    defaultSamplingRate: 50,
} as const;

export default accelerometer;
import { onReadCallback, SensorConfiguration, SensorImplementation } from './index';

export const config: SensorConfiguration = {
    name: 'Gyroscope',
    maxSamplingRate: 100,
    defaultSamplingRate: 50,
    format: ['Accelerometer X', 'Accelerometer Y', 'Accelerometer Z']
} as const;

export const implementation: SensorImplementation = ((() => { // FIXME implement sensor collection
    let f: onReadCallback = () => {};
    const start = () => {
        console.log('sensor started');
        setInterval(() => {
            f({ timestamp: Date.now(), data: [Math.random(), Math.random(), Math.random()] });
        }, 500);
    };
    const stop = () => {
        console.log('sensor stopped');
        f = () => {};
    };
    const onRead = (fn: onReadCallback) => {
        console.log('sensor read callback given');
        f = fn;
    };
    return { start, stop, onRead };
})());
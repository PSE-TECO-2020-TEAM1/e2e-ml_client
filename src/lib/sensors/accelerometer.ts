import { onReadCallback, SensorConfiguration, SensorImplementation } from './index';

export const config: SensorConfiguration = {
    name: 'Accelerometer',
    maxSamplingRate: 100,
    defaultSamplingRate: 50,
} as const;

export const implementation: SensorImplementation = ((() => { // FIXME implement sensor collection
    let f: onReadCallback = () => {};
    const start = () => {
        console.log('sensor started');
        setInterval(() => {
            f({ timestamp: Date.now(), data: [Math.random(), Math.random(), Math.random()] });
        }, 500);
    };
    const stop = () => {};
    const onRead = (fn: onReadCallback) => {
        console.log('sensor read callback given');
        f = fn;
    };
    return { start, stop, onRead };
})());
import { onReadCallback, SensorConfiguration, SensorImplementation } from './index';

export const format = ['Gyroscope X', 'Gyroscope Y', 'Gyroscope Z'];
export const components = ['x', 'y', 'z'];

export const config: SensorConfiguration = {
    name: 'Accelerometer',
    maxSamplingRate: 100,
    defaultSamplingRate: 50,
} as const;

export const implementation: SensorImplementation = ((() => { // FIXME implement sensor collection
    let f: onReadCallback = () => {};
    let handleError = (e: Error) => {};
    const handler = (ac: { target: { x: number; y: number; z: number; }}) => {
        f({ timestamp: Date.now(), data: [ac.target.x, ac.target.y, ac.target.z] });
    };

    let accel: any = null;
    const start = async (rate: number) => {
        try {
            const res = await navigator.permissions.query({ name: 'gyroscope' });
            if (res.state === 'denied') {
                handleError(new Error('Sensor permission denied.'));
                return;    
            };
            accel = new Gyroscope({ referenceFrame: 'device', frequency: rate });
            accel.addEventListener('error', () => {
                handleError(new Error('Cannot connect to the sensor.'));
            });
            accel.addEventListener('reading', handler);
            accel.start();
        } catch (error) {
            if (error.name === 'SecurityError') {
                handleError(new Error('Sensor construction was blocked by a feature policy.'));
            } else if (error.name === 'ReferenceError') {
                handleError(new Error('Sensor is not supported by the User Agent.'));
            } else {
                handleError(new Error('Sensor couldn\'t start.'));
            }
        }
    };
    const stop = () => {
        console.log('sensor stopped');
        f = () => {};
        if (accel) accel.stop();
    };
    const onRead = (fn: onReadCallback) => {
        console.log('sensor read callback given');
        f = fn;
    };
    const onError = (fn: (e: Error) => void) => {
        console.log('sensor error callback given');
        handleError = fn;
    };
    return { start, stop, onRead, onError };
})());
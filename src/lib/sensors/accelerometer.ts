import { onReadCallback, SensorConfiguration, SensorImplementation } from './index';

export const format = ['Accelerometer X', 'Accelerometer Y', 'Accelerometer Z'];
export const components = ['x', 'y', 'z'];

export const config: SensorConfiguration = {
    name: 'Accelerometer',
    maxSamplingRate: 100,
    defaultSamplingRate: 50,
} as const;

export const implementation: SensorImplementation = ((() => { // FIXME implement sensor collection
    let f: onReadCallback = () => {};
    const handler = (ac: { target: { x: number; y: number; z: number; }}) => {
        f({ timestamp: Date.now(), data: [ac.target.x, ac.target.y, ac.target.z] });
    };

    let accel: any = null;
    const start = async (rate: number) => {
        try {
            const res = await navigator.permissions.query({ name: 'accelerometer' });
            if (res.state === 'denied') {
                console.log('denied');
                return;    
            };
            accel = new Accelerometer({ referenceFrame: 'device', frequency: rate });
            accel.addEventListener('error', () => {
                console.log('Cannot connect to the sensor.');
            });
            accel.addEventListener('reading', handler);
            accel.start();
        } catch (error) {
            if (error.name === 'SecurityError') {
                console.log('Sensor construction was blocked by a feature policy.');
            } else if (error.name === 'ReferenceError') {
                console.log('Sensor is not supported by the User Agent.');
            } else {
                throw error;
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
    return { start, stop, onRead };
})());
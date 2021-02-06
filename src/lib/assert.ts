export class AssertionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AssertionError';
    }
}

function assert (condition: any, msg?: string): asserts condition {
    if (!condition) {
        throw new AssertionError(typeof msg !== 'undefined' ? msg : `${condition} assertion failed`);
    }
};

export default assert;
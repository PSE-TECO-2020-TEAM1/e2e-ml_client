export const objectMap = <T,Y>(obj: { [k: string]: T }, fn: (v: T, k: string, i: number) => Y): { [k: string]: Y } =>
    Object.fromEntries(
        Object.entries(obj).map(
            ([k, v], i) => [k, fn(v, k, i)]
        )
    );

export type UnixTimestamp = number;

export const debounce = (fn: (...args: any[]) => any, wait: number) => {
    let timeout: number;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = window.setTimeout(() => fn(...args), wait);
    };
};
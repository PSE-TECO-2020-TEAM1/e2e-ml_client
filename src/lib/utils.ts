import { toaster } from 'evergreen-ui';

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

// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
export const string2NumberHash = function(str: string) {
    let hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
        chr   = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

export const fakeSeededRandom = (seed: number) => {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

export const goldenAngleColor = (number: number) => {
    const hue = number * 137.508; // use golden angle approximation
    return hslToHex(hue, 50, 75);
};

// https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex
export const hslToHex = (h: number, s: number, l: number) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
};

export type ETV<T> = { target: { value: T } };

export const memo = <T,>(cache: Record<string, T>, fn : (...x: any[]) => Promise<T>) => async (x: string, ...arg: any[]) => {
    if (cache[x]) return cache[x];
    cache[x] = await fn(...arg);
    return cache[x];
};

export const notifyError = (s: string) => {
    toaster.danger(s, { id: s });
};

export const formatDate = (date: number) => (new Date(date)).toLocaleString();

export const mode = (array: string[]) => {
    // https://stackoverflow.com/a/1053876/3873452
    const b: Record<string, number> = {};
    let max = '';
    let maxi = 0;
    for(let k of array) {
        if(b[k]) b[k]++; else b[k]=1;
        
        if(maxi < b[k]) { max=k; maxi=b[k]; }
    }

    return max;
};
import { notifyError } from 'lib/utils';

const handleStatusCode = (status: number, body: string): ({} | undefined) => {
    if (status === 200 && body === '') return ({});
    if (status === 200 && body === 'OK') return ({});
    if (status !== 200) {
        try {
            JSON.parse(body);
        } catch (e) {
            notifyError(body);
        }
        const err = JSON.parse(body);
        if (err.error) notifyError(err.error);
        else if (typeof err === 'string') notifyError(err);
        else notifyError(body);
        // throw new Error(body);
    }

    return undefined;
};

const getH = (accessToken: string = '') => async <T,>(url: string, method: string = 'GET'): Promise<T> => {
    const headers: HeadersInit = new Headers();
    if (accessToken !== '') headers.set('Authorization', `Bearer ${accessToken}`);
    
    const res = await fetch(url, {
        method,
        headers,
    });
    
    const body = await res.text();

    console.log(accessToken);

    return handleStatusCode(res.status, body) || JSON.parse(body);
};

const postH = (accessToken: string = '') => async <Input,Output>(url: string, data: Input, method: string = 'POST'): Promise<Output> => {
    const headers: HeadersInit = new Headers();
    headers.set('Content-Type', 'application/json');
    if (accessToken !== '') headers.set('Authorization', `Bearer ${accessToken}`);
    
    const res = await fetch(url, {
        method: method,
        headers,
        body: JSON.stringify(data)
    });

    const body = await res.text();
    
    return handleStatusCode(res.status, body) || JSON.parse(body);
};

export const get = (accessToken?: string) => <T,>(url: string) => getH(accessToken)<T>(url, 'GET');
export const del = (accessToken?: string) => <T,>(url: string) => getH(accessToken)<T>(url, 'DELETE');
export const post = (accessToken?: string) => <T,Y>(url: string, data: T) => postH(accessToken)<T,Y>(url, data, 'POST');
export const put = (accessToken?: string) => <T,Y>(url: string, data: T) => postH(accessToken)<T,Y>(url, data, 'PUT');
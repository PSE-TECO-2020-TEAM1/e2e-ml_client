export interface API {
    login(username: string, password: string): Promise<boolean>,
    signup(username: string, password: string, email: string): Promise<void>,
    isAuthenticated(): boolean
}

export default class SameOriginAPI implements API {
    private accessToken: string | null = null;
    private refreshToken: string | null = null;

    private post = async <T,>(url: string, data: Object, noauth: boolean = false): Promise<T> => {
        const headers: HeadersInit = new Headers();
        headers.set('Content-Type', 'application/json');
        noauth = false; // FIXME: waiting for enes to fix swagger
        if (!noauth) headers.set('Authorization', `Bearer ${this.accessToken}`);

        const res = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });

        const body = await res.text();

        if (res.status === 200 && body === '') return JSON.parse('{}');
        return JSON.parse(body);
    }

    async login(username: string, password: string): Promise<boolean> {
        try {
            ({
                access_token: this.accessToken,
                refresh_token: this.refreshToken
            } = await this.post('/auth/login', { username, passwordHash: password }, true)); // FIXME: eeh we are using tls, so skip hashing on the client
            return this.isAuthenticated();
        } catch(e) {
            return false;
        }
    }
    async signup(username: string, password: string, email: string): Promise<void> {
        await this.post('/auth/signup', { username, passwordHash: password, email }, true);
        return;
    }

    isAuthenticated(): boolean {
        return !!this.accessToken;
    }
}

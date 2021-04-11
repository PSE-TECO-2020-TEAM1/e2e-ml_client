import { ACCESS_TOKEN_EXPIRATION, ACCESS_TOKEN_REFRESH_INTERVAL, LOGIN_CONTROLLER_LOCALSTORAGE_CREDS } from 'config';

export default class LoginController {
    private accessToken: string = '';
    private refreshToken: string = '';

    constructor(api: { refresh: (token: string) => void }) {
        const stored = localStorage.getItem(LOGIN_CONTROLLER_LOCALSTORAGE_CREDS);
        if (stored === null) return;
        const creds: {
            accessToken: string,
            refreshToken: string,
            timestamp: number
        } = JSON.parse(stored);
        if (Date.now() >= creds.timestamp) return; // expired
        this.accessToken = creds.accessToken;
        this.refreshToken = creds.refreshToken;

        setInterval(() => api.refresh(this.refreshToken), ACCESS_TOKEN_REFRESH_INTERVAL);
        setImmediate(() => api.refresh(this.refreshToken)); // this is needed for the case when exiting without refreshing
    }

    login(a: string, r: string) {
        this.accessToken = a;
        this.refreshToken = r;
        localStorage.setItem(LOGIN_CONTROLLER_LOCALSTORAGE_CREDS, JSON.stringify({
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
            timestamp: (new Date(Date.now() + ACCESS_TOKEN_EXPIRATION)).getTime()
        }));
    }

    logout() {
        this.accessToken = '';
        this.refreshToken = '';
        localStorage.removeItem(LOGIN_CONTROLLER_LOCALSTORAGE_CREDS);
    }

    getAccessToken() {
        return this.accessToken;
    }

    isAuthenticated() {
        return !!this.accessToken;
    }
}
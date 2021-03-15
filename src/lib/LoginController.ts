const CREDS = 'creds';
const EXPIRATION = 15 * 60000;

export default class LoginController {
    private accessToken: string | undefined = undefined;
    private refreshToken: string | undefined = undefined;

    constructor() {
        const stored = localStorage.getItem(CREDS);
        if (stored === null) return;
        const creds: {
            accessToken: string,
            refreshToken: string,
            timestamp: number
        } = JSON.parse(stored);
        if (Date.now() >= creds.timestamp) return; // expired
        this.accessToken = creds.accessToken;
        this.refreshToken = creds.refreshToken;
    }

    login(a: string, r: string) {
        this.accessToken = a;
        this.refreshToken = r;
        localStorage.setItem(CREDS, JSON.stringify({
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
            timestamp: (new Date(Date.now() + EXPIRATION)).getTime()
        }));
    }

    logout() {
        this.accessToken = undefined;
        this.refreshToken = undefined;
        localStorage.removeItem(CREDS);
    }

    getAccessToken() {
        return this.accessToken;
    }

    isAuthenticated() {
        return !!this.accessToken;
    }
}
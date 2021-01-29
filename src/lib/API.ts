export interface API {
    login(username: string, password: string): void,
    signup(username: string, password: string, email: string): void,
    isAuthenticated(): boolean
}

export default class SameOriginAPI implements API {
    login(username: string, password: string): void {
        throw new Error('Method not implemented.');
    }
    signup(username: string, password: string, email: string): void {
        throw new Error('Method not implemented.');
    }
    isAuthenticated(): boolean {
        return false;
    }
}

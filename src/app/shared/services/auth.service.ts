export class AuthService {

    private isAuthenticated = false;

    login() {
        this.isAuthenticated = true;
    }

    logout() {
        this.isAuthenticated = false;
        window.localStorage.clear();
    }

    isLoggetIn(): boolean {
        return this.isAuthenticated;
    }
}

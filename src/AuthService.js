/**
 * Service class for authenticating users against an API
 * and storing JSON Web Tokens in the browsers LocalStorage.
 */
class AuthService {

    constructor(auth_api_url) {

        this.auth_api_url = auth_api_url;
        this.fetch = this.fetch.bind(this);
        this.login = this.login.bind(this);
    }

    login(username, password) {
        return this.fetch(this.auth_api_url, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => {
            this.setToken(res.token);
            return Promise.resolve(res);
        })
    }

    loggedIn() {
        return (this.getToken() !== undefined);
    }

    setToken(token) {
        localStorage.setItem('token', token)
    }

    getToken() {
        return localStorage.getItem('token')
    }

    logout() {
        localStorage.setItem('token', "undefined");
    }

    fetch(url, options) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
        .then(response => response.json());
    }
}

export default AuthService;

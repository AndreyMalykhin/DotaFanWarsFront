import hello from 'hellojs';
import jwt_decode from 'jwt-decode';
import {Headers} from 'common/utils/fetcher';

export default class AuthService {
    constructor(fetcher, localStorage) {
        this._fetcher = fetcher;
        this._localStorage = localStorage;
        this._accessTokenKey = 'authService.accessToken';
        this._isLoggedIn = null;
        const accessToken = this.getAccessToken();

        if (accessToken) {
            this._setFetcherAuthHeader(accessToken);
        }
    }

    getAccessToken() {
        return this._localStorage.get(this._accessTokenKey);
    }

    isLoggedIn() {
        if (this._isLoggedIn !== null) {
            return this._isLoggedIn;
        }

        const accessToken = this.getAccessToken();

        if (accessToken == null) {
            this._isLoggedIn = false;
        } else {
            this._isLoggedIn = Date.now() < jwt_decode(accessToken).exp * 1000;
        }

        return this._isLoggedIn;
    }

    loginViaProvider(provider) {
        return new Promise((resolve, reject) => {
            hello(provider).login({scope: 'email'})
                .then((response) => {
                    const providerAccessToken =
                        response.authResponse.access_token;
                    this._fetcher.fetch(`login/${provider}`, {
                        method: 'POST',
                        body: JSON.stringify({
                            providerAccessToken: providerAccessToken
                        }),
                        headers: Headers.withJson(this._fetcher.options.headers)
                    }).then((response) => {
                        if (response.status == 200) {
                            this._isLoggedIn = true;
                            const accessToken = response.data.accessToken;
                            this._localStorage.set(
                                this._accessTokenKey, accessToken);
                            this._setFetcherAuthHeader(accessToken);
                        }

                        resolve(response);
                    }).catch((error) => {
                        reject(error);
                    });
                }, (response) => {
                    const msg = typeof response == 'boolean' ? 'Unknwon error' :
                        response.error.message;
                    reject(new Error(msg));
                });
        });
    }

    _setFetcherAuthHeader(accessToken) {
        this._fetcher.options.headers['Authorization'] = `JWT ${accessToken}`;
    }
}

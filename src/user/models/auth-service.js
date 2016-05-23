import hello from 'hellojs';
import store from 'store';
import jwt_decode from 'jwt_decode';

export default class AuthService {
    constructor(fetcher) {
        this._fetcher = fetcher;
        this._accessTokenKey = 'authService.accessToken';
    }

    isLoggedIn() {
        const token = store.get(this._accessTokenKey);

        if (token == null) {
            return false;
        }

        return Date.now() < jwt_decode(token).exp * 1000;
    }

    loginViaProvider(provider) {
        return hello(provider).login({scope: 'email'})
            .then((response) => {
                debugger;

                const providerAccessToken =
                    hello(provider).getAuthResponse().access_token;
                // return this._fetcher.fetch(`login/${provider}`, {
                //     method: 'POST',
                //     body: JSON.stringify({
                //         providerAccessToken: providerAccessToken
                //     })
                // }).then((response) => {
                //     if (response.status == 200) {
                //         store.set(this._accessTokenKey,
                //             response.data.accessToken);
                //     }

                //     return response;
                // });
                return {status: 200, data: {accessToken: '777'}};
            })
            .catch((response) => {
                throw (typeof response == 'boolean' ? 'Unknwon error' :
                    response.error.message);
            });
    }
}

import {Headers} from 'common/utils/fetcher';

const CURRENT_USER_ID = 'me';

export default class UserService {
    constructor(fetcher) {
        this._fetcher = fetcher;
    }

    get(id = CURRENT_USER_ID) {
        return this._fetcher.fetch(`users/${id}`);
    }

    save(user) {
        return this._fetcher.fetch(`users/${CURRENT_USER_ID}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: Headers.withJson(this._fetcher.options.headers)
        });
    }

    setPhoto(file) {
        const formData = new FormData();
        formData.append('file', file);
        return this._fetcher.fetch(`users/${CURRENT_USER_ID}/photo`, {
            method: 'PUT',
            body: formData,
            headers: Headers.withMultipart(this._fetcher.options.headers)
        });
    }

    getLeaderboard() {
        return this._fetcher.fetch('users?leaderboard');
    }
}

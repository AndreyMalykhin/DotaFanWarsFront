import f from 'isomorphic-fetch';

export default class Fetcher {
    constructor(hostUrl) {
        this._hostUrl = hostUrl;
        this._options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
    }

    fetch(path, options) {
        return f(
            `${this._hostUrl}/${path}`,
            Object.assign(options, this._options
        ).then((response) => response.json());
    }
}

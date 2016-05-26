import f from 'isomorphic-fetch';
import EventEmitter2 from 'eventemitter2';

export default class Fetcher {
    constructor(hostUrl) {
        this._hostUrl = hostUrl;
        this.options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        this._eventBus = new EventEmitter2();
    }

    fetch(path, options) {
        return f(
            `${this._hostUrl}/${path}`,
            Object.assign(options, this._options)
        ).then((response) => {
            response = response.json();
            this._eventBus.emit('response', response);
            return response;
        }, (error) => {
            this._eventBus.emit('error', error);
            throw error;
        });
    }

    on(event, listener) {
        this._eventBus.on(event, listener);
    }
}

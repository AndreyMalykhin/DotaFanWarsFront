import f from 'isomorphic-fetch';
import EventEmitter2 from 'eventemitter2';

export default class Fetcher {
    constructor(hostUrl) {
        this._hostUrl = hostUrl;
        this.options = {
            mode: 'cors',
            headers: {'Accept': 'application/json'}
        };
        this._eventBus = new EventEmitter2();
    }

    fetch(path, options = {}) {
        return f(
            `${this._hostUrl}/${path}`,
            Object.assign({}, this.options, options)
        )
            .then((response) => response.json())
            .then((response) => {
                this._eventBus.emit(Event.RESPONSE, response);
                return response;
            })
            .catch((error) => {
                this._eventBus.emit(Event.ERROR, error);
                throw error;
            });
    }

    on(event, listener) {
        this._eventBus.on(event, listener);
    }
}

export const Event = {
    ERROR: 'error',
    RESPONSE: 'response'
};

export const Headers = {
    withMultipart(headers) {
        return Object.assign(
            {},
            headers,
            {'Content-Type': 'multipart/form-data'}
        );
    },

    withJson(headers) {
        return Object.assign(
            {},
            headers,
            {'Content-Type': 'application/json'}
        );
    }
};

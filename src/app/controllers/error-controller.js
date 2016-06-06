import {ERROR} from 'common/utils/notification-type';
import {addGenericError} from 'common/actions/notification-actions';
import {Event} from 'common/utils/fetcher';

export default class ErrorController {
    constructor(store, fetcher) {
        this._store = store;
        this._fetcher = fetcher;
    }

    bind() {
        this._fetcher.on(Event.RESPONSE, this.onFetcherResponse.bind(this));
        this._fetcher.on(Event.ERROR, this.onFetcherError.bind(this));
    }

    onFetcherResponse(response) {
        if (response.status < 500) {
            return;
        }

        this._store.dispatch(addGenericError());
    }

    onFetcherError(error) {
        this._store.dispatch(addGenericError());
    }
}


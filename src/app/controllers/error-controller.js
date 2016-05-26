import {ERROR} from 'app/utils/notification-type';
import {addGenericError} from 'app/actions/notification-actions';

export default class ErrorController {
    constructor(store) {
        this._store = store;
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


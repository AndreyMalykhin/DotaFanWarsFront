import {push} from 'react-router-redux';
import {Event} from 'match/models/match-service';
import {processServerMessages} from 'match/actions/match-actions';
import {addGenericError} from 'common/actions/notification-actions';

export default class MatchController {
    constructor(store, matchService) {
        this._store = store;
        this._matchService = matchService;
    }

    bind() {
        this._matchService.on(Event.MESSAGES, this.onMessages.bind(this));
        this._matchService.on(Event.DISCONNECT, this.onDisconnect.bind(this));
    }

    onMessages(messages) {
        this._store.dispatch(processServerMessages(messages));
    }

    onDisconnect() {
        const store = this._store;
        const isMatchEnded = store.getState().match.get('result');

        if (isMatchEnded) {
            return;
        }

        store.dispatch(addGenericError());
        store.dispatch(push('/'));
    }
}

import {Event} from 'match/models/match-service';
import {processServerMessages} from 'match/actions/match-actions';

export default class MatchController {
    constructor(store, matchService) {
        this._store = store;
        this._matchService = matchService;
    }

    bind() {
        this._matchService.on(Event.MESSAGES, (messages) => {
            this._store.dispatch(processServerMessages(messages));
        });
    }
}

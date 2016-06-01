import {Event} from 'match/models/match-service';

export default class MatchController {
    constructor(store, matchService) {
        this._store = store;
        this._matchService = matchService;
    }

    bind() {
        this._matchService.on(Event.MESSAGES, this.onMessages.bind(this));
    }

    onMessages(messages) {
    }
}

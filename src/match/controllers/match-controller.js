import {Event} from 'match/models/match-service';

export default class MatchController {
    constructor(store, matchService) {
        this._store = store;
        this._matchService = matchService;
    }

    bind() {
        this._matchService.on(Event.START, this.onStart.bind(this));
        this._matchService.on(Event.UPDATE, this.onUpdate.bind(this));
    }

    onStart(event) {
    }

    onUpdate(event) {
    }
}

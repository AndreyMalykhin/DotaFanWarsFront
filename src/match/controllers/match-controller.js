import {Event, Msg} from 'match/models/match-service';
import {initMatch} from 'match/actions/match-actions';
import {updateSeats} from 'match/actions/seat-actions';
import {updateCharacters} from 'match/actions/character-actions';
import {updateTeams} from 'match/actions/team-actions';
import {updateItems} from 'match/actions/item-actions';
import {updateCountries} from 'match/actions/country-actions';

export default class MatchController {
    constructor(store, matchService) {
        this._store = store;
        this._matchService = matchService;
    }

    bind() {
        this._matchService.on(Event.MESSAGES, this.onMessages.bind(this));
    }

    onMessages(messages) {
        for (let msg of messages) {
            this._processMsg(msg);
        }
    }

    _processMsg(msg) {
        const {type, data} = msg;

        switch (type) {
        case Msg.START:
            this._store.dispatch(initMatch(data.myCharacterId));
            break;
        case Msg.UPDATE_ITEMS:
            this._store.dispatch(updateItems(data));
            break;
        case Msg.UPDATE_SEATS:
            this._store.dispatch(updateSeats(data));
            break;
        case Msg.UPDATE_CHARACTERS:
            this._store.dispatch(updateCharacters(data));
            break;
        case Msg.UPDATE_TEAMS:
            this._store.dispatch(updateTeams(data));
            break;
        case Msg.UPDATE_COUNTRIES:
            this._store.dispatch(updateCountries(data));
            break;
        }
    }
}

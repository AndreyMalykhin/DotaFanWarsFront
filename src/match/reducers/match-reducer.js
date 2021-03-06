import Immutable from 'immutable';
import chatReducer from 'chat/reducers/chat-reducer';
import projectileReducer from 'match/reducers/projectile-reducer';
import characterReducer from 'match/reducers/character-reducer';
import teamReducer from 'match/reducers/team-reducer';
import seatReducer from 'match/reducers/seat-reducer';
import itemReducer from 'match/reducers/item-reducer';
import countryReducer from 'match/reducers/country-reducer';

export default function matchReducer(match = null, action) {
    switch (action.type) {
    case 'JOIN_MATCH_REQUEST':
        return Immutable.Map({
            chat: Immutable.Map({
                messages: Immutable.List(),
                users: Immutable.Map(),
                inputMsg: ''
            }),
            projectiles: Immutable.Map(),
            characters: Immutable.Map(),
            teams: Immutable.OrderedMap(),
            seats: Immutable.Map(),
            items: Immutable.OrderedMap(),
            countries: Immutable.Map(),
            myCharacterId: null,
            result: null
        });
    case 'LEAVE_MATCH':
        return null;
    case 'INIT_MATCH':
        return match.set('myCharacterId', action.payload.myCharacterId);
    case 'END_MATCH':
        return match.set('result', Immutable.fromJS(action.payload));
    }

    return match && match.merge({
        chat: chatReducer(match.get('chat'), action),
        projectiles: projectileReducer(match.get('projectiles'), action),
        characters: characterReducer(match.get('characters'), action),
        teams: teamReducer(match.get('teams'), action),
        seats: seatReducer(match.get('seats'), action),
        items: itemReducer(match.get('items'), action),
        countries: countryReducer(match.get('countries'), action)
    });
}

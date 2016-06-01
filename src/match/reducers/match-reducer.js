import Immutable from 'immutable';
import {PENDING, FAIL, SUCCESS} from 'common/utils/request-status';
import chatReducer from 'chat/reducers/chat-reducer';
import projectileReducer from 'item/reducers/projectile-reducer';
import characterReducer from 'character/reducers/character-reducer';
import teamReducer from 'team/reducers/team-reducer';
import seatReducer from 'match/reducers/seat-reducer';
import tutorialReducer from 'common/reducers/tutorial-reducer';

export default function matchReducer(match = null, action) {
    switch (action.type) {
    case 'JOIN_MATCH_REQUEST':
        return Immutable.Map({
            chat: Immutable.Map({
                messages: Immutable.List(),
                inputMsg: '',
                joinRequestStatus: null
            }),
            projectiles: Immutable.Map(),
            characters: Immutable.Map(),
            teams: Immutable.Map(),
            seats: Immutable.Map(),
            tutorialStep: null,
            myCharacterId: null,
            result: null,
            joinRequestStatus: PENDING
        });
    case 'JOIN_MATCH_RESPONSE':
        if (action.error) {
            return match.set('joinRequestStatus', FAIL);
        }

        return match.set('joinRequestStatus', SUCCESS);
    case 'LEAVE_MATCH':
        return null;
    }

    return match && match.merge({
        chat: chatReducer(match.get('chat'), action),
        projectiles: projectileReducer(match.get('projectiles'), action),
        characters: characterReducer(match.get('characters'), action),
        teams: teamReducer(match.get('teams'), action),
        seats: seatReducer(match.get('seats'), action),
        tutorialStep: tutorialReducer(match.get('tutorialStep'), action)
    });
}

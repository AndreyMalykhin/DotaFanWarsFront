import {PENDING, FAIL, SUCCESS} from 'common/utils/request-status';

export default function matchReducer(match = null, action) {
    switch (action.type) {
    case 'JOIN_MATCH_REQUEST':
        return match.set('joinRequestStatus', PENDING);
    case 'JOIN_MATCH_RESPONSE':
        if (action.error) {
            return match.set('joinRequestStatus', FAIL);
        }

        return match.set('joinRequestStatus', SUCCESS);
    }

    return match;
}

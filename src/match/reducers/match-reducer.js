import {PENDING, FAIL, SUCCESS} from 'common/utils/request-status';

export default function matchReducer(match = null, action) {
    switch (action.type) {
    case 'JOIN_MATCH_REQUEST':
        return match.set('joinRequestStatus', PENDING);
    case 'JOIN_MATCH_RESPONSE':
        if (action.error) {
            return match.set('joinRequestStatus', FAIL);
        }

        match = match.set('joinRequestStatus', SUCCESS);

        if (action.payload.status != 200) {
            return match;
        }

        return match.set('serverUrl', action.payload.data.serverUrl);
    }

    return match;
}

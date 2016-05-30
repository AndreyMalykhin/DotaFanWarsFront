import {PENDING, FAIL, SUCCESS} from 'common/utils/request-status';

export default function chatReducer(chat = null, action) {
    switch (action.type) {
    case 'JOIN_CHAT_REQUEST':
        return chat.set('joinRequestStatus', PENDING);
    case 'JOIN_CHAT_RESPONSE':
        if (action.error) {
            return chat.set('joinRequestStatus', FAIL);
        }

        return chat.set('joinRequestStatus', SUCCESS);
    }

    return chat;
}

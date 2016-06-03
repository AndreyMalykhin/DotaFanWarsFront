import {setRequestStatus} from 'common/actions/request-status-actions';
import {PENDING, SUCCESS, FAIL} from 'common/utils/request-status';

export function joinChat(serverUrl, roomId) {
    return (dispatch, getState, diContainer) => {
        dispatch(setRequestStatus('match.joinChat', PENDING));
        return diContainer.chatService.join(
            serverUrl, diContainer.authService.getAccessToken(), roomId
        ).then((response) => {
            dispatch(setRequestStatus('match.joinChat', SUCCESS));
        }).catch((error) => {
            console.log(error);
            dispatch(setRequestStatus('match.joinChat', FAIL));
        });
    };
}

export function sendMsg() {
}

export function setChatInputMsg(msg) {
}

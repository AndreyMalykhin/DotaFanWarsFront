import {setRequestStatus} from 'common/actions/request-status-actions';
import {PENDING, SUCCESS, FAIL} from 'common/utils/request-status';

export function getUserLeaderboard() {
    return (dispatch, getState, diContainer) => {
        dispatch(setRequestStatus('lobby.getUserLeaderboard', PENDING));
        return diContainer.userService.getLeaderboard()
            .then((response) => {
                dispatch(setRequestStatus('lobby.getUserLeaderboard', SUCCESS));
                dispatch({
                    type: 'GET_USER_LEADERBOARD_RESPONSE',
                    payload: response
                });
            })
            .catch((error) => {
                console.log(error);
                dispatch(setRequestStatus('lobby.getUserLeaderboard', FAIL));
                dispatch({
                    type: 'GET_USER_LEADERBOARD_RESPONSE',
                    payload: error,
                    error: true
                });
            });
    };
}

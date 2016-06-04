import {setRequestStatus} from 'common/actions/request-status-actions';
import {PENDING, SUCCESS, FAIL} from 'common/utils/request-status';
import {processMessages} from 'match/actions/match-actions';

export function takeSeat(id) {
    return (dispatch, getState, diContainer) => {
        dispatch(setRequestStatus('match.takeSeat', PENDING));
        return diContainer.matchService.takeSeat(id)
            .then((messages) => {
                dispatch(setRequestStatus('match.takeSeat', SUCCESS));
                dispatch(processMessages(messages));
            })
            .catch((error) => {
                console.log(error);
                dispatch(setRequestStatus('match.takeSeat', FAIL));
            });
    };
}

export function updateSeats(seats) {
    return {type: 'UPDATE_SEATS', payload: seats};
}

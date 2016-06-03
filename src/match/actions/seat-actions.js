import {setRequestStatus} from 'common/actions/request-status-actions';
import {PENDING, SUCCESS, FAIL} from 'common/utils/request-status';

export function takeSeat(id) {
    return (dispatch, getState, diContainer) => {
        dispatch(setRequestStatus('match.takeSeat', PENDING));
        return diContainer.matchService.takeSeat(id)
            .then(() => {
                dispatch(setRequestStatus('match.takeSeat', SUCCESS));
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

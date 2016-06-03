import {push} from 'react-router-redux';
import {INFO, ERROR} from 'app/utils/notification-type';
import {addNotification} from 'app/actions/notification-actions';
import {joinChat} from 'chat/actions/chat-actions';
import {NO_FREE_SLOTS, LEAVER} from 'match/utils/game-server-error-code';
import {ensureTutorial} from 'common/actions/tutorial-actions';
import {setRequestStatus} from 'common/actions/request-status-actions';
import {PENDING, SUCCESS, FAIL} from 'common/utils/request-status';

export function openRoomPicker(matchId, teamId) {
    return {
        type: 'OPEN_ROOM_PICKER',
        payload: {matchId: matchId, teamId: teamId}
    };
}

export function closeRoomPicker() {
    return {type: 'CLOSE_ROOM_PICKER'};
}

export function getMatchRooms(matchId) {
    return (dispatch, getState, diContainer) => {
        dispatch({type: 'GET_MATCH_ROOMS_REQUEST'});
        return diContainer.matchService.getRooms(matchId)
            .then((response) => {
                dispatch({type: 'GET_MATCH_ROOMS_RESPONSE', payload: response});
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: 'GET_MATCH_ROOMS_RESPONSE',
                    payload: error,
                    error: true
                });
            });
    };
}

export function joinMatch(room, teamId) {
    return (dispatch, getState, diContainer) => {
        dispatch({type: 'JOIN_MATCH_REQUEST'});
        dispatch(setRequestStatus('match.joinMatch', PENDING));
        const roomId = room.get('id');
        const accessToken = diContainer.authService.getAccessToken();
        return diContainer.matchService.join(
            room.get('gameServerUrl'), accessToken, roomId, teamId
        ).then((response) => {
            dispatch(setRequestStatus('match.joinMatch', SUCCESS));
            dispatch(joinChat(room.get('chatServerUrl'), accessToken, roomId));
            dispatch(push('/match'));
            dispatch(ensureTutorial());
        }).catch((error) => {
            console.log(error);
            dispatch(setRequestStatus('match.joinMatch', FAIL));
            let notificationType;
            let notificationBody;
            const translations = getState().locale.get('translations');

            switch (error.message) {
            case NO_FREE_SLOTS:
                notificationType = INFO;
                notificationBody = translations.get('match.noFreeSlotsError');
                break;
            case LEAVER:
                notificationType = ERROR;
                notificationBody = translations.get('match.leaverError');
                break;
            }

            if (notificationBody) {
                dispatch(
                    addNotification(notificationType, notificationBody));
            }
        });
    };
}

export function leaveMatch() {
    return (dispatch, getState, diContainer) => {
        diContainer.matchService.leave();
        dispatch({type: 'LEAVE_MATCH'});
    };
}

export function initMatch(myCharacterId) {
    return {type: 'INIT_MATCH', payload: {myCharacterId: myCharacterId}};
}

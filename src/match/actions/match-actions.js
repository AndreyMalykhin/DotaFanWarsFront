import {push} from 'react-router-redux';
import {INFO, ERROR} from 'app/utils/notification-type';
import {addNotification} from 'app/actions/notification-actions';
import {joinChat} from 'chat/actions/chat-actions';
import {NO_FREE_SLOTS, LEAVER} from 'match/utils/game-server-error-code';

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
        const roomId = room.get('id');
        const accessToken = diContainer.authService.getAccessToken();
        return diContainer.matchService.join(
            room.get('gameServerUrl'), accessToken, roomId, teamId
        ).then((response) => {
            dispatch({type: 'JOIN_MATCH_RESPONSE', payload: response});
            dispatch(joinChat(room.get('chatServerUrl'), accessToken, roomId));
            dispatch(push('/match'));
        }).catch((error) => {
            dispatch({
                type: 'JOIN_MATCH_RESPONSE',
                payload: error,
                error: true
            });
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

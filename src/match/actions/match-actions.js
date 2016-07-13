import {push} from 'react-router-redux';
import {INFO, ERROR} from 'common/utils/notification-type';
import {addNotification, addGenericError} from
    'common/actions/notification-actions';
import {joinChat} from 'chat/actions/chat-actions';
import {NO_FREE_SLOTS, LEAVER} from 'match/utils/game-server-error-code';
import {setRequestStatus} from 'common/actions/request-status-actions';
import {PENDING, SUCCESS, FAIL} from 'common/utils/request-status';
import {Msg} from 'match/models/match-service';
import {updateSeats} from 'match/actions/seat-actions';
import {removeCharacters, updateCharacters} from
    'match/actions/character-actions';
import {updateTeams} from 'match/actions/team-actions';
import {updateItems} from 'match/actions/item-actions';
import {updateCountries} from 'match/actions/country-actions';
import {removeProjectiles, updateProjectiles} from
    'match/actions/projectile-actions';

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
            room.get('matchServerUrl'), accessToken, roomId, teamId
        ).then(() => {
            dispatch(setRequestStatus('match.joinMatch', SUCCESS));
            dispatch(joinChat(room.get('chatServerUrl'), accessToken, roomId));
            dispatch(push('/match'));
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
                return;
            }

            dispatch(addGenericError());
        });
    };
}

export function leaveMatch() {
    return (dispatch, getState, diContainer) => {
        diContainer.matchService.leave();
        diContainer.chatService.leave();
        dispatch({type: 'LEAVE_MATCH'});
        return Promise.resolve();
    };
}

export function processServerMessages(messages) {
    return (dispatch) => {
        const promises = [];

        for (let msg of messages) {
            promises.push(dispatch(processServerMsg(msg)));
        }

        return Promise.all(promises);
    };
}

function processServerMsg(msg) {
    const {type, data} = msg;

    switch (type) {
    case Msg.START:
        return initMatch(data.myCharacterId);
    case Msg.END:
        return endMatch(data);
    case Msg.UPDATE_ITEMS:
        return updateItems(data);
    case Msg.UPDATE_SEATS:
        return updateSeats(data);
    case Msg.UPDATE_CHARACTERS:
        return updateCharacters(data);
    case Msg.REMOVE_CHARACTERS:
        return removeCharacters(data);
    case Msg.UPDATE_TEAMS:
        return updateTeams(data);
    case Msg.UPDATE_COUNTRIES:
        return updateCountries(data);
    case Msg.UPDATE_PROJECTILES:
        return updateProjectiles(data);
    case Msg.REMOVE_PROJECTILES:
        return removeProjectiles(data);
    }

    console.assert(false);
    return null;
}

function initMatch(myCharacterId) {
    return {type: 'INIT_MATCH', payload: {myCharacterId: myCharacterId}};
}

function endMatch(matchResult) {
    return {type: 'END_MATCH', payload: matchResult};
}

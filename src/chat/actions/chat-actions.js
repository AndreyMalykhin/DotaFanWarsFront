import {setRequestStatus} from 'common/actions/request-status-actions';
import {PENDING, SUCCESS, FAIL} from 'common/utils/request-status';
import {Msg} from 'chat/models/chat-service';
import {addGenericError} from 'common/actions/notification-actions';

export function joinChat(serverUrl, accessToken, roomId, teamId) {
    return (dispatch, getState, diContainer) => {
        dispatch(setRequestStatus('match.joinChat', PENDING));
        return diContainer.chatService.join(
            serverUrl, accessToken, roomId, teamId
        ).then(() => {
            dispatch(setRequestStatus('match.joinChat', SUCCESS));
        }, (error) => {
            console.log(error);
            dispatch(setRequestStatus('match.joinChat', FAIL));
            dispatch(addGenericError());
        });
    };
}

export function sendMsg() {
    return (dispatch, getState, diContainer) => {
        const msg = getState().match.get('chat').get('inputMsg');
        dispatch(setChatInputMsg(''));
        dispatch(setRequestStatus('match.sendMsg', PENDING));
        return diContainer.chatService.sendMsg(msg)
            .then((messages) => {
                dispatch(setRequestStatus('match.sendMsg', SUCCESS));
                dispatch(processServerMessages(messages));
            })
            .catch((error) => {
                console.log(error);
                dispatch(setRequestStatus('match.sendMsg', FAIL));
            });
    };
}

export function setChatInputMsg(msg) {
    return {type: 'SET_CHAT_INPUT_MSG', payload: msg};
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
        return initChat();
    case Msg.UPDATE_MESSAGES:
        return updateChatMessages(data);
    case Msg.UPDATE_USERS:
        return updateChatUsers(data);
    case Msg.REMOVE_USERS:
        return removeChatUsers(data);
    }

    console.assert(false);
    return null;
}

function initChat() {
    return {type: 'INIT_CHAT'};
}

function updateChatMessages(messages) {
    return {type: 'UPDATE_CHAT_MESSAGES', payload: messages};
}

function updateChatUsers(users) {
    return {type: 'UPDATE_CHAT_USERS', payload: users};
}

function removeChatUsers(ids) {
    return {type: 'REMOVE_CHAT_USERS', payload: ids};
}

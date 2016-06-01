export function joinChat(serverUrl, roomId) {
    return (dispatch, getState, diContainer) => {
        dispatch({type: 'JOIN_CHAT_REQUEST'});
        return diContainer.chatService.join(
            serverUrl, diContainer.authService.getAccessToken(), roomId
        ).then((response) => {
            dispatch({type: 'JOIN_CHAT_RESPONSE', payload: response});
        }).catch((error) => {
            dispatch({
                type: 'JOIN_CHAT_RESPONSE',
                payload: error,
                error: true
            });
        });
    };
}

export function sendMsg() {
}

export function setChatInputMsg(msg) {
}

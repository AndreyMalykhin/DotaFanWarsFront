export function getUser() {
    return (dispatch, getState, diContainer) => {
        dispatch({type: 'GET_USER_REQUEST'});
        return diContainer.userService.get()
            .then((response) => {
                dispatch({
                    type: 'GET_USER_RESPONSE',
                    payload: response
                });
            })
            .catch((error) => {
                dispatch({
                    type: 'GET_USER_RESPONSE',
                    payload: error,
                    error: true
                });
            });
    };
}

export function saveUser() {
    return (dispatch, getState, diContainer) => {
        dispatch({type: 'SAVE_USER_REQUEST'});
        const form = getState().userForm;
        const user = {
            nickname: form.get('nickname'),
            countryId: form.get('countryId')
        };
        return diContainer.userService.save(user)
            .then((response) => {
                dispatch({
                    type: 'SAVE_USER_RESPONSE',
                    payload: response
                });
            })
            .catch((error) => {
                dispatch({
                    type: 'SAVE_USER_RESPONSE',
                    payload: error,
                    error: true
                });
            });
    };
}

export function setUserPhoto(file) {
    return (dispatch, getState, diContainer) => {
        dispatch({type: 'SET_USER_PHOTO_REQUEST'});
        return diContainer.userService.setPhoto(file)
            .then((response) => {
                dispatch({
                    type: 'SET_USER_PHOTO_RESPONSE',
                    payload: response
                });
            })
            .catch((error) => {
                dispatch({
                    type: 'SET_USER_PHOTO_RESPONSE',
                    payload: error,
                    error: true
                });
            });
    };
}

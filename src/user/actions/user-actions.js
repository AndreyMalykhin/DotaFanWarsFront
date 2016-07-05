import {setUserFormErrors} from 'user/actions/user-form-actions';

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
                console.log(error);
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
        dispatch(setUserFormErrors({}));
        dispatch({type: 'SAVE_USER_REQUEST'});
        const form = getState().userForm;
        const user = {
            nickname: form.get('nickname'),
            country: form.get('country') || null
        };
        return diContainer.userService.save(user)
            .then((response) => {
                dispatch({
                    type: 'SAVE_USER_RESPONSE',
                    payload: response
                });

                if (response.status == 400) {
                    dispatch(setUserFormErrors(response.data));
                }
            })
            .catch((error) => {
                console.log(error);
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
        dispatch(setUserFormErrors({}));
        dispatch({type: 'SET_USER_PHOTO_REQUEST'});
        return diContainer.userService.setPhoto(file)
            .then((response) => {
                dispatch({
                    type: 'SET_USER_PHOTO_RESPONSE',
                    payload: response
                });

                if (response.status == 400) {
                    dispatch(
                        setUserFormErrors({photoFile: response.data.file}));
                }
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: 'SET_USER_PHOTO_RESPONSE',
                    payload: error,
                    error: true
                });
            });
    };
}

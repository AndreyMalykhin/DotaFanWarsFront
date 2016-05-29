import {addGenericError} from 'app/actions/notification-actions';
import {ERROR} from 'app/utils/notification-type';

export function setLoggedIn(isLoggedIn) {
    return {type: 'SET_LOGGED_IN', payload: {isLoggedIn: isLoggedIn}};
}

export function loginViaProvider(provider) {
    return (dispatch, getState, diContainer) => {
        dispatch({type: 'LOGIN_REQUEST'});
        return diContainer.authService.loginViaProvider(provider)
            .then((response) => {
                dispatch({
                    type: 'LOGIN_RESPONSE',
                    payload: response
                });
            })
            .catch((error) => {
                dispatch({
                    type: 'LOGIN_RESPONSE',
                    payload: error,
                    error: true
                });
                dispatch(addGenericError());
            });
    };
}

export function openLoginDlg(onPostLogin, onAlreadyLoggedIn) {
    return (dispatch, getState, diContainer) => {
        if (getState().auth.get('isLoggedIn')) {
            onAlreadyLoggedIn();
            return Promise.resolve();
        }

        const action = {type: 'OPEN_LOGIN_DLG'};
        dispatch({action: action, onPostLogin: onPostLogin});
        return Promise.resolve();
    };
}

export function closeLoginDlg() {
    return {type: 'CLOSE_LOGIN_DLG'};
}

import {addGenericError} from 'common/actions/notification-actions';
import {ERROR} from 'common/utils/notification-type';
import {setRequestStatus} from 'common/actions/request-status-actions';
import {PENDING, SUCCESS, FAIL} from 'common/utils/request-status';

export function setLoggedIn(isLoggedIn) {
    return {type: 'SET_LOGGED_IN', payload: {isLoggedIn: isLoggedIn}};
}

export function loginViaProvider(provider) {
    return (dispatch, getState, diContainer) => {
        dispatch(setRequestStatus('lobby.login', PENDING));
        return diContainer.authService.loginViaProvider(provider)
            .then((response) => {
                dispatch({
                    type: 'LOGIN_RESPONSE',
                    payload: response
                });
                dispatch(setRequestStatus('lobby.login', SUCCESS));
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: 'LOGIN_RESPONSE',
                    payload: error,
                    error: true
                });
                dispatch(setRequestStatus('lobby.login', FAIL));
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

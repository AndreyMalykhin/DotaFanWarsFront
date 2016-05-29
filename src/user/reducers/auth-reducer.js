import Immutable from 'immutable';
import {PENDING, FAIL, SUCCESS} from 'common/utils/request-status';

export default function authReducer(auth = null, action) {
    switch (action.type) {
    case 'SET_LOGGED_IN':
        return auth.set('isLoggedIn', action.payload.isLoggedIn);
    case 'LOGIN_REQUEST':
        return auth.set('loginRequestStatus', PENDING);
    case 'LOGIN_RESPONSE':
        const isSuccess = !action.error;
        return auth.merge({
            isLoggedIn: isSuccess && action.payload.status == 200,
            loginRequestStatus: isSuccess ? SUCCESS : FAIL,
            isLoginDlgOpened: false
        });
    case 'OPEN_LOGIN_DLG':
        return auth.set('isLoginDlgOpened', true);
    case 'CLOSE_LOGIN_DLG':
        return auth.set('isLoginDlgOpened', false);
    }

    return auth;
};

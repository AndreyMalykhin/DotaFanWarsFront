import Immutable from 'immutable';
import {PENDING, FAIL, SUCCESS} from 'common/utils/request-status';

export default function authReducer(auth = null, action) {
    switch (action.type) {
    case 'SET_LOGGED_IN':
        return auth.set('isLoggedIn', action.payload.isLoggedIn);
    case 'LOGIN_RESPONSE':
        return auth.merge({
            isLoggedIn: !action.error && action.payload.status == 200,
            isLoginDlgOpened: false
        });
    case 'OPEN_LOGIN_DLG':
        return auth.set('isLoginDlgOpened', true);
    case 'CLOSE_LOGIN_DLG':
        return auth.set('isLoginDlgOpened', false);
    }

    return auth;
};

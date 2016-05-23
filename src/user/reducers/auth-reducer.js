import Immutable from 'immutable';
import {PENDING, FAIL, SUCCESS} from 'common/utils/request-status';

export default function authReducer(auth = null, action) {
    switch (action.type) {
    case 'LOGIN_REQUEST':
        return auth.set('loginRequestStatus', PENDING);
    case 'LOGIN_RESPONSE':
        const isSuccess = !action.error;
        return auth.merge({
            isAuthed: action.payload.status == 200,
            loginRequestStatus: isSuccess ? SUCCESS : FAIL
        });
    case 'OPEN_LOGIN_DLG':
        return auth.set('isLoginDlgOpened', true);
    case 'CLOSE_LOGIN_DLG':
        return auth.set('isLoginDlgOpened', false);
    }

    return auth;
};

import {PENDING} from 'common/utils/request-status';

const postLoginMiddleware = store => next => {
    let callback;

    return (action) => {
        if (typeof action != 'object') {
            return next(action);
        }

        const onPostLogin = action.onPostLogin;
        const realAction = onPostLogin ? action.action : action;
        let result;

        switch (realAction.type) {
        case 'OPEN_LOGIN_DLG':
            callback = onPostLogin;
            result = next(realAction);
            break;
        case 'CLOSE_LOGIN_DLG':
            if (store.getState().requestStatuses.get('lobby.login') !=
                    PENDING) {
                callback = null;
            }

            result = next(realAction);
            break;
        case 'LOGIN_RESPONSE':
            result = next(realAction);

            if (callback
                && !realAction.error
                && realAction.payload.status == 200
            ) {
                callback();
                callback = null;
            }

            break;
        default:
            result = next(realAction);
        }

        return result;
    };
};

export default postLoginMiddleware;

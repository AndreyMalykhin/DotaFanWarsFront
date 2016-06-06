import uuid from 'node-uuid';
import {ERROR} from 'common/utils/notification-type';

export function addNotification(type, body) {
    return {
        type: 'ADD_NOTIFICATION',
        payload: {
            id: uuid.v4(),
            type: type,
            body: body
        }
    };
}

export function addGenericError() {
    return (dispatch, getState, diContainer) => {
        dispatch(addNotification(
            ERROR,
            getState().locale.get('translations').get('common.genericError')
        ));
        return Promise.resolve();
    };
}

export function removeNotification(id) {
    return {
        type: 'REMOVE_NOTIFICATION',
        payload: {id: id}
    };
}

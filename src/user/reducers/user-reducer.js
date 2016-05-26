import Immutable from 'immutable';
import {PENDING, SUCCESS, FAIL} from 'common/utils/request-status';

export default function userReducer(user = null, action) {
    switch (action.type) {
    case 'SAVE_USER_REQUEST':
        return user.set('saveRequestStatus', PENDING);
    case 'SAVE_USER_RESPONSE':
        if (action.error) {
            return user.set('saveRequestStatus', FAIL);
        }

        user = user.set('saveRequestStatus', SUCCESS);

        if (action.payload.status != 200) {
            return user;
        }

        return user.mergeDeep(action.payload.data);
    case 'GET_USER_REQUEST':
        return user.set('getRequestStatus', PENDING);
    case 'GET_USER_RESPONSE':
        if (action.error) {
            return user.set('getRequestStatus', FAIL);
        }

        user = user.set('getRequestStatus', SUCCESS);

        if (action.payload.status != 200) {
            return user;
        }

        return user.mergeDeep(action.payload.data);
    case 'SET_USER_PHOTO_REQUEST':
        return user.set('setPhotoRequestStatus', PENDING);
    case 'SET_USER_PHOTO_RESPONSE':
        if (action.error) {
            return user.set('setPhotoRequestStatus', FAIL);
        }

        user = user.set('setPhotoRequestStatus', SUCCESS);

        if (action.payload.status != 200) {
            return user;
        }

        return user.set('photoUrl', action.payload.data.url);
    }

    return user;
};

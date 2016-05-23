import Immutable from 'immutable';

export default function userReducer(user = null, action) {
    switch (action.type) {
    case 'LOGIN_RESPONSE':
        if (action.error) {
            return user;
        }

        return Immutable.fromJS(action.payload.user);
    }

    return user;
};

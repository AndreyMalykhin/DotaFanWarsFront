import Immutable from 'immutable';

export default function userFormReducer(userForm = null, action) {
    switch (action.type) {
    case 'SET_USER_COUNTRY':
        return userForm.set('countryId', action.payload.id);
    case 'SET_USER_NICKNAME':
        return userForm.set('nickname', action.payload.nickname);
    case 'SAVE_USER_RESPONSE':
        if (action.error || action.payload.status != 400) {
            return userForm;
        }

        return userForm.set('errors', Immutable.Map(action.payload.data));
    case 'SET_USER_PHOTO_RESPONSE':
        if (action.error || action.payload.status != 400) {
            return userForm;
        }

        return userForm.setIn(['errors', 'photoFile'],
            Immutable.Map(action.payload.data.file));
    case 'FILL_USER_FORM':
        return userForm.merge(action.payload);
    }

    return userForm;
}

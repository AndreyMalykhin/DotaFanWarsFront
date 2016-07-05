import Immutable from 'immutable';

export default function userFormReducer(userForm = null, action) {
    switch (action.type) {
    case 'SET_USER_COUNTRY':
        return userForm.set('country', action.payload.id);
    case 'SET_USER_NICKNAME':
        return userForm.set('nickname', action.payload.nickname);
    case 'SET_USER_FORM_ERRORS':
        return userForm.set('errors', Immutable.Map(action.payload));
    case 'FILL_USER_FORM':
        return userForm.mergeDeep(action.payload);
    }

    return userForm;
}

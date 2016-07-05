export function setUserCountry(id) {
    return {
        type: 'SET_USER_COUNTRY',
        payload: {
            id: id
        }
    };
}

export function setUserNickname(nickname) {
    return {
        type: 'SET_USER_NICKNAME',
        payload: {
            nickname: nickname
        }
    };
}

export function fillUserForm() {
    return (dispatch, getState) => {
        const user = getState().user;
        const country = user.get('country');
        dispatch({
            type: 'FILL_USER_FORM',
            payload: {
                country: country ? country.get('id') : null,
                nickname: user.get('nickname')
            }
        });
        dispatch(setUserFormErrors({}));
        return Promise.resolve();
    };
}

export function setUserFormErrors(errors) {
    return {type: 'SET_USER_FORM_ERRORS', payload: errors};
}

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
    return (dispatch, getState, diContainer) => {
        const user = getState().user;
        dispatch({
            type: 'FILL_USER_FORM',
            payload: {
                countryId: user.get('countryId'),
                nickname: user.get('nickname')
            }
        });
        return Promise.resolve();
    };
}

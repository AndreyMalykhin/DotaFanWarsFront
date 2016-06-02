import {launchProjectile} from 'match/actions/projectile-actions';

export function touchCharacter(id) {
    return (dispatch, getState, diContainer) => {
        const match = getState().match;
        const myCharacter =
            match.get('characters').get(match.get('myCharacterId'));
        const activeItem = myCharacter.get('items')
            .find((item) => item.get('isActive'));

        if (activeItem) {
            return dispatch(attackCharacter(id, activeItem.get('id')));
        }

        return dispatch(setTarget(id));
    };
}

function setTarget(targetId) {
    return (dispatch, getState, diContainer) => {
        dispatch({
            type: 'SET_CHARACTER_TARGET',
            payload: {
                characterId: getState().match.get('myCharacterId'),
                targetId: targetId
            }
        });
        return Promise.resolve();
    };
}

export function clearTarget() {
    return setTarget(null);
}

function attackCharacter(characterId, itemId) {
    return (dispatch, getState, diContainer) => {
        return dispatch(launchProjectile(characterId)).then(() => {
            diContainer.matchService.attackCharacter(characterId, itemId);
        });
    };
}

export function updateCharacters(characters) {
    return {type: 'UPDATE_CHARACTERS', payload: characters};
}

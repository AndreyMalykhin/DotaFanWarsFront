import {launchProjectile} from 'match/actions/projectile-actions';
import {OFFENSIVE} from 'match/models/item-type';
import {setRequestStatus} from 'common/actions/request-status-actions';
import {PENDING, SUCCESS, FAIL} from 'common/utils/request-status';

export function touchCharacter(id) {
    return (dispatch, getState, diContainer) => {
        const match = getState().match;
        const myCharacterId = match.get('myCharacterId');
        const myCharacter = match.get('characters').get(myCharacterId);
        const activeItem = myCharacter.get('items')
            .find((item) => item.get('isActive'));

        if (activeItem) {
            if (!activeItem.get('count')) {
                return Promise.resolve();
            }

            dispatch(setRequestStatus('match.useOffensiveItem', PENDING));
            return dispatch(launchProjectile(id))
                .then(() => {
                    return diContainer.matchService.useItem(
                        activeItem.get('id'), id);
                })
                .then(() => {
                    dispatch(
                        setRequestStatus('match.useOffensiveItem', SUCCESS));
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(
                        setRequestStatus('match.useOffensiveItem', FAIL));
                });
        }

        if (myCharacter.get('targetId') == id) {
            return dispatch(clearTarget());
        }

        return dispatch(setTarget(id));
    };
}

export function clearTarget() {
    return setTarget(null);
}

export function updateCharacters(characters) {
    return {type: 'UPDATE_CHARACTERS', payload: characters};
}

export function buyItem(id) {
}

export function useItem(id) {
    return (dispatch, getState, diContainer) => {
        const match = getState().match;
        const isOffensive = match.get('items').get(id).get('type') == OFFENSIVE;

        if (isOffensive) {
            const myCharacterId = match.get('myCharacterId');
            const isItemActive = match.get('characters').get(myCharacterId)
                .get('items').get(id).get('isActive');
            dispatch(setItemActive(myCharacterId, id, !isItemActive));
            return Promise.resolve();
        }

        dispatch(setRequestStatus('match.useDefensiveItem', PENDING));
        return diContainer.matchService.useItem(id)
            .then(() => {
                dispatch(setRequestStatus('match.useDefensiveItem', SUCCESS));
            })
            .catch((error) => {
                console.log(error);
                dispatch(setRequestStatus('match.useDefensiveItem', FAIL));
            });
    };
}

function setItemActive(characterId, itemId, isActive) {
    return {
        type: 'SET_ITEM_ACTIVE',
        payload: {characterId: characterId, itemId: itemId, isActive: isActive}
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

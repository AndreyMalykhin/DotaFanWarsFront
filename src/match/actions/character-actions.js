import {launchProjectile} from 'match/actions/projectile-actions';
import {OFFENSIVE} from 'match/models/item-type';
import {setRequestStatus} from 'common/actions/request-status-actions';
import {PENDING, SUCCESS, FAIL} from 'common/utils/request-status';
import {processMessages} from 'match/actions/match-actions';

export function touchCharacter(id) {
    return (dispatch, getState, diContainer) => {
        const match = getState().match;
        const myCharacterId = match.get('myCharacterId');
        const myCharacter = match.get('characters').get(myCharacterId);
        const myActiveItemId = myCharacter.get('activeItemId');
        const isEnemy = match.get('characters').get(id).get('teamId') !=
            myCharacter.get('teamId');

        if (myActiveItemId && isEnemy) {
            dispatch(setRequestStatus('match.useOffensiveItem', PENDING));
            return dispatch(launchProjectile(id))
                .then(() => {
                    return diContainer.matchService.useItem(myActiveItemId, id);
                })
                .then((messages) => {
                    dispatch(
                        setRequestStatus('match.useOffensiveItem', SUCCESS));
                    dispatch(processMessages(messages));
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
    return (dispatch, getState, diContainer) => {
        const match = getState().match;
        const myCharacterId = match.get('myCharacterId');
        const myCharacter = match.get('characters').get(myCharacterId);

        if (myCharacter) {
            const myActiveItemId = myCharacter.get('activeItemId');

            if (myActiveItemId) {
                characters = characters.map((character) => {
                    if (character.id != myCharacterId || !character.items) {
                        return character;
                    }

                    for (let item of character.items) {
                        if (item.count === 0 && item.id == myActiveItemId) {
                            return Object.assign(
                                {activeItemId: null}, character);
                        }
                    }

                    return character;
                });
            }
        }

        dispatch({type: 'UPDATE_CHARACTERS', payload: characters});
        return Promise.resolve();
    };
}

export function buyItem(id) {
    return (dispatch, getState, diContainer) => {
        dispatch(setRequestStatus('match.buyItem', PENDING));
        return diContainer.matchService.buyItem(id)
            .then((messages) => {
                dispatch(setRequestStatus('match.buyItem', SUCCESS));
                dispatch(processMessages(messages));
            })
            .catch((error) => {
                console.log(error);
                dispatch(setRequestStatus('match.buyItem', FAIL));
            });
    };
}

export function useItem(id) {
    return (dispatch, getState, diContainer) => {
        const match = getState().match;
        const isOffensive = match.get('items').get(id).get('type') == OFFENSIVE;

        if (isOffensive) {
            const myCharacterId = match.get('myCharacterId');
            const isItemActive = match.get('characters').get(myCharacterId)
                .get('activeItemId') == id;
            dispatch(setActiveItem(myCharacterId, isItemActive ? null : id));
            return Promise.resolve();
        }

        dispatch(setRequestStatus('match.useDefensiveItem', PENDING));
        return diContainer.matchService.useItem(id)
            .then((messages) => {
                dispatch(setRequestStatus('match.useDefensiveItem', SUCCESS));
                dispatch(processMessages(messages));
            })
            .catch((error) => {
                console.log(error);
                dispatch(setRequestStatus('match.useDefensiveItem', FAIL));
            });
    };
}

function setActiveItem(characterId, itemId = null) {
    return {
        type: 'SET_ACTIVE_ITEM',
        payload: {characterId: characterId, itemId: itemId}
    };
}

function setTarget(targetId) {
    return (dispatch, getState, diContainer) => {
        dispatch({
            type: 'SET_TARGET',
            payload: {
                characterId: getState().match.get('myCharacterId'),
                targetId: targetId
            }
        });
        return Promise.resolve();
    };
}

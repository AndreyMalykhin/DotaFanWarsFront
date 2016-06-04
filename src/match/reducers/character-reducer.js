import Immutable from 'immutable';

export default function characterReducer(characters = null, action) {
    switch (action.type) {
    case 'UPDATE_CHARACTERS':
        return characters.mergeDeep(
            Immutable.fromJS(action.payload, charactersReviver));
    case 'SET_TARGET':
        const {characterId, targetId} = action.payload;
        return characters.setIn([characterId, 'targetId'], targetId);
    case 'SET_ACTIVE_ITEM': {
        const payload = action.payload;
        return characters.setIn(
            [payload.characterId, 'activeItemId'], payload.itemId);
    }
    }

    return characters;
}

function charactersReviver(key, value) {
    switch(key) {
    case '':
        return Immutable.Map().withMutations((characters) => {
            for (let character of value.values()) {
                characters.set(character.get('id'), character);
            }
        });
    case 'items':
        return Immutable.Map().withMutations((items) => {
            for (let item of value.values()) {
                items.set(item.get('id'), item);
            }
        });
    }

    return Immutable.Iterable.isIndexed(value) ? value.toList() : value.toMap();
}

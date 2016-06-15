import Immutable from 'immutable';

export default function itemReducer(items = null, action) {
    switch (action.type) {
    case 'UPDATE_ITEMS':
        return items.withMutations((items) => {
            for (let item of action.payload) {
                items.mergeDeepIn([item.id], item);
            }
        });
    }

    return items;
}

import Immutable from 'immutable';

export default function itemReducer(items = null, action) {
    switch (action.type) {
    case 'UPDATE_ITEMS':
        return items.withMutations((items) => {
            for (let item of action.payload) {
                items.merge({[item.id]: Immutable.fromJS(item)});
            }
        });
    }

    return items;
}

export default function itemReducer(items = null, action) {
    switch (action.type) {
    case 'UPDATE_ITEMS':
        return items.mergeDeep(action.payload);
    }

    return items;
}

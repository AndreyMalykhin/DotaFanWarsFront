export default function requestStatusReducer(statuses = null, action) {
    switch (action.type) {
    case 'SET_REQUEST_STATUS':
        const {name, status} = action.payload;
        return statuses.set(name, status);
    }

    return statuses;
}

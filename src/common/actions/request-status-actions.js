export function setRequestStatus(name, status) {
    return {type: 'SET_REQUEST_STATUS', payload: {name: name, status: status}};
}

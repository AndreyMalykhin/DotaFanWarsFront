export function takeSeat(id) {
    return (dispatch, getState, diContainer) => {
        diContainer.matchService.takeSeat(id);
        return Promise.resolve();
    };
}

export function updateSeats(seats) {
    return {type: 'UPDATE_SEATS', payload: seats};
}

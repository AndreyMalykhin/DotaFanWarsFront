export function getMatchSchedule(page) {
    return (dispatch, getState, diContainer) => {
        dispatch({
            type: 'GET_MATCH_SCHEDULE_REQUEST',
            payload: {page: page}
        });
        return diContainer.matchService.getSchedule(page)
            .then((response) => {
                dispatch({
                    type: 'GET_MATCH_SCHEDULE_RESPONSE',
                    payload: response
                });
            })
            .catch((error) => {
                dispatch({
                    type: 'GET_MATCH_SCHEDULE_RESPONSE',
                    payload: error,
                    error: true
                });
            });
    };
}

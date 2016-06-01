export function getMatchSchedule(page) {
    return (dispatch, getState, diContainer) => {
        dispatch({type: 'GET_MATCH_SCHEDULE_REQUEST'});
        return diContainer.matchService.getSchedule(page)
            .then((response) => {
                const data = Object.assign(
                    {page: page, lastUpdateTime: Date.now()}, response.data);
                response = Object.assign({}, response, {data: data});
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

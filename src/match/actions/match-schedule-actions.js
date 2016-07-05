export function getMatchSchedule(page) {
    console.assert(page);
    return (dispatch, getState, diContainer) => {
        dispatch({type: 'GET_MATCH_SCHEDULE_REQUEST'});
        return doGetMatchSchedule(page, dispatch, diContainer);
    };
}

function doGetMatchSchedule(page, dispatch, diContainer) {
    return diContainer.matchService.getSchedule(page)
        .then((response) => {
            const pageCount = response.data.pageCount;

            if (pageCount < page && pageCount > 0) {
                return doGetMatchSchedule(page - 1);
            }

            const data = Object.assign(
                {page: page, lastUpdateTime: Date.now()}, response.data);
            response = Object.assign({}, response, {data: data});
            dispatch({
                type: 'GET_MATCH_SCHEDULE_RESPONSE',
                payload: response
            });
        })
        .catch((error) => {
            console.log(error);
            dispatch({
                type: 'GET_MATCH_SCHEDULE_RESPONSE',
                payload: error,
                error: true
            });
        });
}

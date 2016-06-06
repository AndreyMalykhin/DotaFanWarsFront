export function getCountries() {
    return (dispatch, getState, diContainer) => {
        dispatch({type: 'GET_COUNTRIES_REQUEST'});
        return diContainer.countryService.getAll()
            .then((response) => {
                dispatch({
                    type: 'GET_COUNTRIES_RESPONSE',
                    payload: response
                });
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: 'GET_COUNTRIES_RESPONSE',
                    payload: error,
                    error: true
                });
            });
    };
}

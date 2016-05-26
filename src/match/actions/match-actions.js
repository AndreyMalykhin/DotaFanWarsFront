export function joinMatch(matchId, teamId) {
    return (dispatch, getState, diContainer) => {
        dispatch({type: 'JOIN_MATCH_REQUEST'});
    };
}

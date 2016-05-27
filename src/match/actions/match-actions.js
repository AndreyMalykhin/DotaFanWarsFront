import {INFO, ERROR} from 'app/utils/notification-type';
import {addNotification} from 'app/actions/notification-actions';

export function joinMatch(matchId, teamId) {
    return (dispatch, getState, diContainer) => {
        dispatch({type: 'JOIN_MATCH_REQUEST'});
        return diContainer.matchService.join(matchId, teamId)
            .then((response) => {
                let notificationType;
                let notificationBody;
                const translations = getState().locale.get('translations');

                switch (response.status) {
                case 423:
                    notificationType = INFO;
                    notificationBody = translations.get('match.noFreeSlots');
                    break;
                case 403:
                    notificationType = ERROR;
                    notificationBody = translations.get('match.forbidden');
                    break;
                }

                if (notificationBody) {
                    dispatch(
                        addNotification(notificationType, notificationBody));
                }

                dispatch({
                    type: 'JOIN_MATCH_RESPONSE',
                    payload: response
                });
            })
            .catch((error) => {
                dispatch({
                    type: 'JOIN_MATCH_RESPONSE',
                    payload: error,
                    error: true
                });
            });
    };
}

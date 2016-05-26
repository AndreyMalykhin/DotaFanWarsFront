import Immutable from 'immutable';

export default function notificationReducer(notifications = null, action) {
    switch (action.type) {
    case 'ADD_NOTIFICATION':
        return notifications.push(Immutable.Map(action.payload));
    case 'REMOVE_NOTIFICATION':
        const id = action.payload.id;
        return notifications.filter(
            (notification) => notification.get('id') != id);
    }

    return notifications;
}

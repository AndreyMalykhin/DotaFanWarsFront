import Immutable from 'immutable';

export default function chatReducer(chat = null, action) {
    switch (action.type) {
    case 'SET_CHAT_INPUT_MSG':
        return chat.set('inputMsg', action.payload);
    case 'UPDATE_CHAT_MESSAGES':
        return chat.update('messages',
            (messages) => messages.concat(Immutable.fromJS(action.payload)));
    case 'UPDATE_CHAT_USERS':
        return chat.update('users', (users) => {
            return users.withMutations((users) => {
                for (let user of action.payload) {
                    users.merge({[user.id]: Immutable.fromJS(user)});
                }
            });
        });
    case 'REMOVE_CHAT_USERS':
        return chat.update('users', (users) => {
            return users.filter(
                (user) => !action.payload.includes(user.get('id')));
        });
    }

    return chat;
}

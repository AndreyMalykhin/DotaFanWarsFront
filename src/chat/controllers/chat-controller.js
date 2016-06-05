import {Event} from 'chat/models/chat-service';
import {processServerMessages} from 'chat/actions/chat-actions';

export default class ChatController {
    constructor(store, chatService) {
        this._store = store;
        this._chatService = chatService;
    }

    bind() {
        this._chatService.on(Event.MESSAGES, (messages) => {
            this._store.dispatch(processServerMessages(messages));
        });
    }
}

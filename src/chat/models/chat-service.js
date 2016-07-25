import EventEmitter2 from 'eventemitter2';

export default class ChatService {
    constructor(socketIO) {
        this._socketIO = socketIO;
        this._socket = null;
        this._eventBus = new EventEmitter2();
    }

    join(serverUrl, accessToken, roomId, teamId) {
        return new Promise((resolve, reject) => {
            const query = `accessToken=${encodeURIComponent(accessToken)}&roomId=${encodeURIComponent(roomId)}&teamId=${encodeURIComponent(teamId)}`;
            this._socket = this._socketIO.connect(serverUrl, {
                query: query,
                transports: ['websocket', 'polling'],
                reconnection: false
            });
            const onConnect = () => {
                this._listenServer();
                this._socket.removeListener('error', onError);
                this._socket.removeListener('connect_error', onError);
                this._socket.once(Event.MESSAGES, () => {resolve();});
            };
            const onError = (error) => {
                this._socket.removeListener('connect', onConnect);
                this._socket.removeListener('error', onError);
                this._socket.removeListener('connect_error', onError);
                reject(typeof error == 'string' ? new Error(error) : error);
            };
            this._socket.once('connect', onConnect);
            this._socket.once('error', onError);
            this._socket.once('connect_error', onError);
        });
    }

    leave() {
        if (!this._socket) {
            return;
        }

        this._socket.disconnect(true);
        this._socket = null;
    }

    sendMsg(msg) {
        return new Promise((resolve) => {
            this._socket.emit('sendMsg', {msg: msg}, resolve);
        });
    }

    on(event, listener) {
        this._eventBus.on(event, listener);
    }

    _listenServer() {
        this._socket.on(Event.MESSAGES, (messages) => {
            this._eventBus.emit(Event.MESSAGES, messages);
        });
    }
}

export const Msg = {
    START: 'start',
    UPDATE_MESSAGES: 'updateMessages',
    UPDATE_USERS: 'updateUsers',
    REMOVE_USERS: 'removeUsers'
};

export const Event = {
    MESSAGES: 'messages'
};

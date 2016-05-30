import EventEmitter2 from 'eventemitter2';

export default class MatchService {
    constructor(fetcher, socketIO) {
        this._fetcher = fetcher;
        this._socketIO = socketIO;
        this._socket = null;
        this._eventBus = new EventEmitter2();
    }

    join(gameServerUrl, accessToken, roomId, teamId) {
        return new Promise((resolve, reject) => {
            const query = `accessToken=${encodeURIComponent(accessToken)}&roomId=${encodeURIComponent(roomId)}&teamId=${encodeURIComponent(teamId)}`;
            this._socket = this._socketIO.connect(gameServerUrl,
                {query: query, transports: ['websocket', 'polling']});
            const onConnect = () => {
                this._listenGameServer();
                this._socket.removeListener('error', onError);
                this._socket.once('start', (event) => {resolve();});
            };
            const onError = (code) => {
                this._socket.removeListener('connect', onConnect);
                reject(new Error(code));
            };
            this._socket.once('connect', onConnect);
            this._socket.once('error', onError);
        });
    }

    leave() {
        if (!this._socket) {
            return;
        }

        this._socket.disconnect();
        this._socket = null;
    }

    getRooms(matchId) {
        return this._fetcher.fetch(`matches/${matchId}/rooms`);
    }

    getSchedule(page) {
        return this._fetcher.fetch(`match-schedule?page=${page}`);
    }

    on(event, listener) {
        this._eventBus.on(event, listener);
    }

    _listenGameServer() {
        this._socket.on(Event.UPDATE, (event) => {
            this._eventBus.emit(Event.UPDATE, event);
        });
        this._socket.on(Event.START, (event) => {
            this._eventBus.emit(Event.START, event);
        });
    }
}

export const Event = {
    UPDATE: 'update',
    START: 'start'
};

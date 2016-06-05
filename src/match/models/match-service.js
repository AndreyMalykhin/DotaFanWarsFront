import EventEmitter2 from 'eventemitter2';

export default class MatchService {
    constructor(fetcher, socketIO) {
        this._fetcher = fetcher;
        this._socketIO = socketIO;
        this._socket = null;
        this._eventBus = new EventEmitter2();
    }

    getRooms(matchId) {
        return this._fetcher.fetch(`matches/${matchId}/rooms`);
    }

    getSchedule(page) {
        return this._fetcher.fetch(`match-schedule?page=${page}`);
    }

    join(gameServerUrl, accessToken, roomId, teamId) {
        return new Promise((resolve, reject) => {
            const query = `accessToken=${encodeURIComponent(accessToken)}&roomId=${encodeURIComponent(roomId)}&teamId=${encodeURIComponent(teamId)}`;
            this._socket = this._socketIO.connect(gameServerUrl,
                {query: query, transports: ['websocket', 'polling']});
            const onConnect = () => {
                this._listenServer();
                this._socket.removeListener('error', onError);
                this._socket.removeListener('connect_error', onError);
                this._socket.once(Event.MESSAGES, () => {resolve();});
            };
            const onError = (error) => {
                this._socket.removeListener('connect', onConnect);
                this._socket.disconnect(true);
                this._socket = null;
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

    takeSeat(id) {
        return new Promise((resolve, reject) => {
            this._socket.emit('takeSeat', {seatId: id}, resolve);
        });
    }

    useItem(itemId, targetId = null) {
        return new Promise((resolve, reject) => {
            this._socket.emit(
                'useItem', {itemId: itemId, targetId: targetId}, resolve);
        });
    }

    buyItem(id) {
        return new Promise((resolve, reject) => {
            this._socket.emit('buyItem', {itemId: id}, resolve);
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

export const Event = {
    MESSAGES: 'messages'
};

export const Msg = {
    START: 'start',
    END: 'end',
    UPDATE_SEATS: 'updateSeats',
    UPDATE_CHARACTERS: 'updateCharacters',
    REMOVE_CHARACTERS: 'removeCharacters',
    UPDATE_TEAMS: 'updateTeams',
    UPDATE_ITEMS: 'updateItems',
    UPDATE_COUNTRIES: 'updateCountries',
    UPDATE_PROJECTILES: 'updateProjectiles',
    REMOVE_PROJECTILES: 'removeProjectiles'
};

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
            // const query = `accessToken=${encodeURIComponent(accessToken)}&roomId=${encodeURIComponent(roomId)}&teamId=${encodeURIComponent(teamId)}`;
            // this._socket =
            //     this._socketIO.connect(gameServerUrl, {query: query});
            // const onConnect = () => {
            //     this._listenGameServer();
            //     this._socket.removeListener('error', onError);
            //     this._socket.once('update', (event) => {resolve();});
            // };
            // const onError = (code) => {
            //     this._socket.removeListener('connect', onConnect);
            //     reject(new Error(code));
            // };
            // this._socket.once('connect', onConnect);
            // this._socket.once('error', onError);
            setTimeout(() => {
                resolve({});
            }, 2000);
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
        // return this._fetcher.fetch(`matches/${matchId}/rooms`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    status: 200,
                    data: [
                        {
                            id: '1',
                            name: 'room 1',
                            gameServerUrl: 'ws://localhost/game',
                            chatServerUrl: 'ws://localhost/chat'
                        },
                        {
                            id: '2',
                            name: 'room 2',
                            gameServerUrl: 'ws://localhost/game',
                            chatServerUrl: 'ws://localhost/chat'
                        }
                    ]
                });
            }, 2000);
        });
    }

    getSchedule(page) {
        return this._fetcher.fetch(`match-schedule?page=${page}`);
        // return new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve({
        //             status: 200,
        //             data: {
        //                 items: [
        //                     {
        //                         id: '1',
        //                         teams: [
        //                             {
        //                                 id: '1',
        //                                 name: 'Natus Vincere',
        //                                 logoUrl: 'http://riki.dotabuff.net/t/l/3QxyeKbMK6.png'
        //                             },
        //                             {
        //                                 id: '2',
        //                                 name: 'Evil Geniuses',
        //                                 logoUrl: 'http://riki.dotabuff.net/t/l/kgTT6l6bM1.png'
        //                             }
        //                         ],
        //                         startDate: new Date().toISOString()
        //                     },
        //                     {
        //                         id: '2',
        //                         teams: [
        //                             {
        //                                 id: '3',
        //                                 name: '!Natus Vincere',
        //                                 logoUrl: 'http://riki.dotabuff.net/t/l/3QxyeKbMK6.png'
        //                             },
        //                             {
        //                                 id: '4',
        //                                 name: '!Evil Geniuses',
        //                                 logoUrl: 'http://riki.dotabuff.net/t/l/kgTT6l6bM1.png'
        //                             }
        //                         ],
        //                         startDate: new Date(Date.now() + 60*60*1000).toISOString()
        //                     }
        //                 ],
        //                 page: page,
        //                 pageCount: 4
        //             }
        //         });
        //     }, 2000);
        // });
    }

    on(event, listener) {
        this._eventBus.on(event, listener);
    }

    _listenGameServer() {
        this._socket.on(Event.UPDATE, (event) => {
            this._eventBus.emit(Event.UPDATE, event);
        });
    }
}

export const Event = {
    UPDATE: 'update'
};

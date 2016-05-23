export default class MatchService {
    constructor(fetcher) {
        this._fetcher = fetcher;
    }

    getSchedule(page) {
        // return this._fetcher.fetch('match-schedule');
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    status: 200,
                    data: {
                        schedule: [
                            {
                                id: '1',
                                teams: [
                                    {
                                        id: '1',
                                        name: 'Natus Vincere',
                                        logoUrl: 'http://riki.dotabuff.net/t/l/3QxyeKbMK6.png'
                                    },
                                    {
                                        id: '2',
                                        name: 'Evil Geniuses',
                                        logoUrl: 'http://riki.dotabuff.net/t/l/kgTT6l6bM1.png'
                                    }
                                ],
                                startDate: new Date().toISOString()
                            },
                            {
                                id: '2',
                                teams: [
                                    {
                                        id: '3',
                                        name: '!Natus Vincere',
                                        logoUrl: 'http://riki.dotabuff.net/t/l/3QxyeKbMK6.png'
                                    },
                                    {
                                        id: '4',
                                        name: '!Evil Geniuses',
                                        logoUrl: 'http://riki.dotabuff.net/t/l/kgTT6l6bM1.png'
                                    }
                                ],
                                startDate: new Date(Date.now() + 60*60*1000).toISOString()
                            }
                        ],
                        pageCount: 4
                    }
                });
            }, 2000);
        });
    }
}

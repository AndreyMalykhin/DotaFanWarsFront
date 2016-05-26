export default class CountryService {
    constructor(fetcher) {
        this._fetcher = fetcher;
    }

    getAll() {
        // return this._fetcher.fetch('countries');
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    status: 200,
                    data: [
                        {id: '1', name: 'Ukraine'},
                        {id: '2', name: 'USA'},
                    ]
                });
            }, 2000);
        });
    }
}

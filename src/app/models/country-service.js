export default class CountryService {
    constructor(fetcher) {
        this._fetcher = fetcher;
    }

    getAll() {
        return this._fetcher.fetch('countries');
    }
}

import localStorage from 'store';
import {hashHistory} from 'react-router';
import Fetcher from 'common/utils/fetcher';
import MatchService from 'match/models/match-service';
import AuthService from 'user/models/auth-service';
import UserService from 'user/models/user-service';
import CountryService from 'app/models/country-service';
import storeFactory from 'app/utils/store-factory';
import ErrorController from 'app/controllers/error-controller';

export function setupDI(di) {
    di.constant('history', hashHistory);
    di.constant('localStorage', localStorage);
    di.service('matchService', MatchService, 'Fetcher');
    di.service('authService', AuthService, 'Fetcher', 'localStorage');
    di.service('userService', UserService, 'Fetcher');
    di.service('countryService', CountryService, 'Fetcher');
    di.service('errorController', ErrorController, 'store');
    di.factory('store', storeFactory);
    di.factory('fetcher', (container) => {
        const fetcher = new Fetcher(process.env.DFWF_BACKEND_URL);
        fetcher.options.headers['Accept-Language'] =
            container.store.getState().locale.get('id');
        return fetcher;
    });
}

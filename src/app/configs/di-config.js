import Fetcher from 'common/utils/fetcher';
import MatchService from 'match/models/match-service';
import AuthService from 'user/models/auth-service';
import storeFactory from 'app/utils/store-factory';

export function setupDI(di) {
    di.factory('fetcher', (container) => {
        return new Fetcher(process.env.DFWF_BACKEND_URL);
    });
    di.service('matchService', MatchService, 'Fetcher');
    di.service('authService', AuthService, 'Fetcher');
    di.factory('store', storeFactory);
}

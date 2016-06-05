import localStorage from 'store';
import io from 'socket.io-client';
import {hashHistory} from 'react-router';
import Fetcher from 'common/utils/fetcher';
import MatchService from 'match/models/match-service';
import MatchController from 'match/controllers/match-controller';
import AuthService from 'user/models/auth-service';
import UserService from 'user/models/user-service';
import ChatService from 'chat/models/chat-service';
import ChatController from 'chat/controllers/chat-controller';
import CountryService from 'app/models/country-service';
import ErrorController from 'app/controllers/error-controller';
import storeFactory from 'app/utils/store-factory';

export function setupDI(di) {
    di.constant('history', hashHistory);
    di.constant('localStorage', localStorage);
    di.constant('socketIO', io);
    di.service('matchService', MatchService, 'fetcher', 'socketIO');
    di.service('authService', AuthService, 'fetcher', 'localStorage');
    di.service('userService', UserService, 'fetcher');
    di.service('chatService', ChatService, 'socketIO');
    di.service('countryService', CountryService, 'fetcher');
    di.service('errorController', ErrorController, 'store', 'fetcher');
    di.service('matchController', MatchController, 'store', 'matchService');
    di.service('chatController', ChatController, 'store', 'chatService');
    di.factory('store', storeFactory);
    di.factory('fetcher', (container) => {
        const fetcher = new Fetcher(process.env.DFWF_BACKEND_URL);
        fetcher.options.headers['Accept-Language'] =
            container.store.getState().locale.get('id');
        return fetcher;
    });
}

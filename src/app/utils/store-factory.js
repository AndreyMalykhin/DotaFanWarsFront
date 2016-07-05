import FacebookIcon from 'user/images/facebook.svg';
import GoogleIcon from 'user/images/google.svg';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import Immutable from 'immutable';
import reducer from 'app/reducers/app-reducer';
import postLoginMiddleware from 'app/utils/post-login-middleware.js';
import {SUCCESS} from 'common/utils/request-status';
import {FACEBOOK, GOOGLE} from 'user/utils/login-provider-id';
import translations from 'app/translations/en';
import {EN, RU} from 'common/utils/locale-id';

export default function storeFactory(container) {
    const initialState = {
        user: Immutable.Map({
            rating: null,
            nickname: null,
            country: null,
            photoUrl: null,
            saveRequestStatus: null,
            getRequestStatus: null,
            setPhotoRequestStatus: null
        }),
        userForm: Immutable.Map({
            country: '',
            nickname: '',
            errors: Immutable.Map()
        }),
        auth: Immutable.Map({
            providers: Immutable.fromJS([
                {id: FACEBOOK, logo: FacebookIcon},
                {id: GOOGLE, logo: GoogleIcon}
            ]),
            isLoggedIn: false,
            isLoginDlgOpened: false
        }),
        match: null,
        matchSchedule: Immutable.Map({
            items: null,
            page: 1,
            pageCount: null,
            getRequestStatus: null,
            lastUpdateTime: null
        }),
        notifications: Immutable.List(),
        supportedLocales: Immutable.List([EN, RU]),
        locale: Immutable.Map({
            id: EN,
            translations: Immutable.Map(translations),
            requestStatus: SUCCESS
        }),
        countries: Immutable.Map({
            items: null,
            getRequestStatus: null
        }),
        toolbar: Immutable.Map({
            isExpanded: false
        }),
        roomPicker: Immutable.Map({
            isOpen: false,
            rooms: null,
            teamId: null,
            matchId: null,
            getRoomsRequestStatus: null
        }),
        requestStatuses: Immutable.Map({
            'match.joinMatch': null,
            'match.joinChat': null,
            'match.takeSeat': null,
            'match.useOffensiveItem': null,
            'match.useDefensiveItem': null,
            'match.buyItem': null,
            'match.sendMsg': null,
            'lobby.getUserLeaderboard': null,
            'lobby.login': null
        }),
        tutorials: Immutable.Map({
            match: Immutable.Map({
                step: null,
                stepCount: 5
            })
        }),
        userLeaderboard: Immutable.Map({
            items: null
        })
    };
    let middlewares = [
        thunk.withExtraArgument(container),
        postLoginMiddleware,
        routerMiddleware(container.history),
    ];
    middlewares = compose(
        applyMiddleware(...middlewares),
        window.devToolsExtension ? window.devToolsExtension() : (f) => f
    );
    return createStore(reducer, initialState, middlewares);
}

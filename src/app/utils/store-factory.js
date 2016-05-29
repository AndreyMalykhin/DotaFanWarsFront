import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import Immutable from 'immutable';
import reducer from 'app/reducers/app-reducer';
import postLoginMiddleware from 'app/utils/post-login-middleware.js';
import {PENDING, SUCCESS} from 'common/utils/request-status';
import {FACEBOOK, GOOGLE} from 'user/utils/login-provider-id';
import translations from 'app/translations/en';

export default function storeFactory(container) {
    const initialState = {
        user: Immutable.Map({
            rating: null,
            nickname: null,
            countryId: null,
            photoUrl: null,
            saveRequestStatus: null,
            getRequestStatus: null,
            setPhotoRequestStatus: null
        }),
        userForm: Immutable.Map({
            countryId: '',
            nickname: '',
            errors: Immutable.Map()
        }),
        auth: Immutable.Map({
            providers: Immutable.List([FACEBOOK, GOOGLE]),
            isLoggedIn: false,
            isLoginDlgOpened: false,
            loginRequestStatus: null
        }),
        match: Immutable.Map({
            joinRequestStatus: null
        }),
        matchSchedule: Immutable.Map({
            items: null,
            page: 1,
            pageCount: null,
            getRequestStatus: null,
            lastUpdateTime: null
        }),
        notifications: Immutable.List(),
        supportedLocales: Immutable.List(['en', 'ru']),
        locale: Immutable.Map({
            id: 'en',
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
        chat: Immutable.Map({
            joinRequestStatus: null
        })
    };
    const middlewares = compose(
        applyMiddleware(
            thunk.withExtraArgument(container),
            postLoginMiddleware,
            routerMiddleware(container.history)
        ),
        window.devToolsExtension ? window.devToolsExtension() : (f) => f
    );
    return createStore(reducer, initialState, middlewares);
}

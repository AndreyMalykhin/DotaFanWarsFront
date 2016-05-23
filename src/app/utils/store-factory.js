import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import reducer from 'app/reducers/app-reducer';
import postLoginMiddleware from 'app/utils/post-login-middleware.js';
import {PENDING, SUCCESS} from 'common/utils/request-status';
import {FACEBOOK, GOOGLE} from 'user/utils/login-provider-id';
import translations from 'app/translations/en';

export default function storeFactory(container) {
    const initialState = {
        user: null,
        auth: Immutable.Map({
            providers: Immutable.List([FACEBOOK, GOOGLE]),
            isAuthed: container.authService.isLoggedIn(),
            isLoginDlgOpened: false,
            loginRequestStatus: SUCCESS
        }),
        match: Immutable.Map({
            joinRequestStatus: SUCCESS
        }),
        supportedLocales: Immutable.List(['en', 'ru']),
        matchSchedule: Immutable.Map({
            items: null,
            page: 1,
            pageCount: null,
            requestStatus: SUCCESS,
            lastUpdateTime: null
        }),
        locale: Immutable.Map({
            id: 'en',
            translations: Immutable.Map(translations),
            requestStatus: SUCCESS
        })
    };
    const middlewares = compose(
        applyMiddleware(
            thunk.withExtraArgument(container),
            postLoginMiddleware
        ),
        window.devToolsExtension ? window.devToolsExtension() : (f) => f
    );
    return createStore(reducer, initialState, middlewares);
}

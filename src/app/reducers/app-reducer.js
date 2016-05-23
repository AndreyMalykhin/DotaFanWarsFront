import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import userReducer from 'user/reducers/user-reducer';
import dummyReducer from 'common/reducers/dummy-reducer';
import localeReducer from 'app/reducers/locale-reducer';
import matchScheduleReducer from 'match/reducers/match-schedule-reducer';
import authReducer from 'user/reducers/auth-reducer';
import matchReducer from 'match/reducers/match-reducer';

export default combineReducers({
    user: userReducer,
    auth: authReducer,
    match: matchReducer,
    locale: localeReducer,
    matchSchedule: matchScheduleReducer,
    supportedLocales: dummyReducer,
    routing: routerReducer
});

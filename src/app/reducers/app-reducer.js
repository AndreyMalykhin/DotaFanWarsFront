import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import userReducer from 'user/reducers/user-reducer';
import userFormReducer from 'user/reducers/user-form-reducer';
import dummyReducer from 'common/reducers/dummy-reducer';
import localeReducer from 'app/reducers/locale-reducer';
import matchScheduleReducer from 'match/reducers/match-schedule-reducer';
import authReducer from 'user/reducers/auth-reducer';
import matchReducer from 'match/reducers/match-reducer';
import notificationReducer from 'app/reducers/notification-reducer';
import countryReducer from 'app/reducers/country-reducer';
import toolbarReducer from 'app/reducers/toolbar-reducer';

export default combineReducers({
    user: userReducer,
    userForm: userFormReducer,
    auth: authReducer,
    match: matchReducer,
    locale: localeReducer,
    matchSchedule: matchScheduleReducer,
    notifications: notificationReducer,
    supportedLocales: dummyReducer,
    countries: countryReducer,
    toolbar: toolbarReducer,
    routing: routerReducer
});

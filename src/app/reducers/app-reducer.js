import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import userReducer from 'user/reducers/user-reducer';
import userFormReducer from 'user/reducers/user-form-reducer';
import authReducer from 'user/reducers/auth-reducer';
import dummyReducer from 'common/reducers/dummy-reducer';
import requestStatusReducer from 'common/reducers/request-status-reducer';
import tutorialReducer from 'common/reducers/tutorial-reducer';
import matchScheduleReducer from 'match/reducers/match-schedule-reducer';
import matchReducer from 'match/reducers/match-reducer';
import roomPickerReducer from 'match/reducers/room-picker-reducer';
import localeReducer from 'app/reducers/locale-reducer';
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
    roomPicker: roomPickerReducer,
    requestStatuses: requestStatusReducer,
    tutorials: tutorialReducer,
    routing: routerReducer
});

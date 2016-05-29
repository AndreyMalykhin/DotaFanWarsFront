import 'babel-polyfill';
import 'intl';
import 'intl/locale-data/jsonp/en';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {addLocaleData} from 'react-intl';
import localeData from 'react-intl/locale-data/en';
import Bottle from 'bottlejs';
import hello from 'hellojs';
import {setupDI} from 'app/configs/di-config';
import AppRouter from 'app/components/app-router';
import {setLoggedIn} from 'user/actions/auth-actions';

hello.init({
    facebook: process.env.DFWF_FACEBOOK_APP_ID,
    google: process.env.DFWF_GOOGLE_APP_ID
});
addLocaleData(localeData);
const di = new Bottle();
setupDI(di);
const diContainer = di.container;
diContainer.errorController.bind();
diContainer.matchController.bind();
const store = diContainer.store;
store.dispatch(setLoggedIn(diContainer.authService.isLoggedIn()));
const history = syncHistoryWithStore(diContainer.history, store);

render(
    <Provider store={store}>
        <AppRouter history={history}/>
    </Provider>,
    document.getElementById("app")
);

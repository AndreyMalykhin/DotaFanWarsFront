import {addLocaleData} from 'react-intl';
import {LOCALE} from 'common/utils/setting-id';

export function setLocale(id) {
    return (dispatch, getState, diContainer) => {
        dispatch({type: 'SET_LOCALE_REQUEST'});
        return new Promise((resolve, reject) => {
            require(`bundle?lazy!intl/locale-data/jsonp/${id}.js`)(() => {
                require(`bundle?lazy!react-intl/locale-data/${id}.js`)((localeData) => {
                    require(`bundle?lazy!app/translations/${id}.js`)((translations) => {
                        addLocaleData(localeData);
                        const {localStorage, fetcher} = diContainer;
                        localStorage.set(LOCALE, id);
                        fetcher.options.headers['Accept-Language'] = id;
                        dispatch({
                            type: 'SET_LOCALE_RESPONSE',
                            payload: {
                                id: id,
                                translations: translations.default
                            }
                        });
                        resolve();
                    });
                });
            });
        });
    };
}

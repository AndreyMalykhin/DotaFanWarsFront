import {addLocaleData} from 'react-intl';

export function setLocale(id) {
    return (dispatch, getState, diContainer) => {
        dispatch({type: 'SET_LOCALE_REQUEST'});
        return new Promise((resolve, reject) => {
            require(`bundle?lazy!intl/locale-data/jsonp/${id}.js`)(() => {
                require(`bundle?lazy!react-intl/locale-data/${id}.js`)((localeData) => {
                    require(`bundle?lazy!app/translations/${id}.js`)((translations) => {
                        addLocaleData(localeData);
                        dispatch({
                            type: 'SET_LOCALE_RESPONSE',
                            payload: {
                                status: 200,
                                data: {
                                    id: id,
                                    translations: translations.default
                                }
                            }
                        });
                        resolve();
                    });
                });
            });
        });
    };
}

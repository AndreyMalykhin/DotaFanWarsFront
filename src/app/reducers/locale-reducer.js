import {PENDING, FAIL, SUCCESS} from 'common/utils/request-status';

export default function localeReducer(locale = null, action) {
    switch (action.type) {
    case 'SET_LOCALE_REQUEST':
        return locale.set('requestStatus', PENDING);
    case 'SET_LOCALE_RESPONSE':
        if (action.error) {
            return locale.set('requestStatus', FAIL);
        }

        const {localeId, translations} = action.payload.data;
        return locale.mergeDeep({
            id: localeId,
            translations: translations,
            requestStatus: SUCCESS
        });
    }

    return locale;
}

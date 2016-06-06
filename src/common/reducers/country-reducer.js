import Immutable from 'immutable';
import {PENDING, SUCCESS, FAIL} from 'common/utils/request-status';

export default function countryReducer(countries = null, action) {
    switch (action.type) {
    case 'GET_COUNTRIES_REQUEST':
        return countries.set('getRequestStatus', PENDING);
    case 'GET_COUNTRIES_RESPONSE':
        if (action.error) {
            return countries.set('getRequestStatus', FAIL);
        }

        countries = countries.set('getRequestStatus', SUCCESS);

        if (action.payload.status != 200) {
            return countries;
        }

        return countries.set('items', Immutable.fromJS(action.payload.data));
    }

    return countries;
}

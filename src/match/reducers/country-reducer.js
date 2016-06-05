import Immutable from 'immutable';

export default function countryReducer(countries = null, action) {
    switch (action.type) {
    case 'UPDATE_COUNTRIES':
        return countries.withMutations((countries) => {
            for (let country of action.payload) {
                countries.merge({[country.id]: Immutable.fromJS(country)});
            }
        });
    }

    return countries;
}

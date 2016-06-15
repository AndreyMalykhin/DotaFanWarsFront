import Immutable from 'immutable';

export default function teamReducer(teams = null, action) {
    switch (action.type) {
    case 'UPDATE_TEAMS':
        return teams.withMutations((teams) => {
            for (let team of action.payload) {
                teams.mergeDeepIn([team.id], team);
            }
        });
    }

    return teams;
}

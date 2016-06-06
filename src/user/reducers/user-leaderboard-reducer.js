import Immutable from 'immutable';

export default function userLeaderboardReducer(leaderboard = null, action) {
    switch (action.type) {
    case 'GET_USER_LEADERBOARD_RESPONSE':
        const {status, data} = action.payload;

        if (status != 200) {
            return leaderboard;
        }

        return leaderboard.set('items', Immutable.fromJS(data));
    }

    return leaderboard;
}

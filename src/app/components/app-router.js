import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import App from 'app/components/app';
import MatchSchedule from 'match/components/match-schedule';
import TeamLeaderboard from 'team/components/team-leaderboard';
import Profile from 'user/components/profile';
import UserLeaderboard from 'user/components/user-leaderboard';

const AppRouter = React.createClass({
    render() {
        return (
            <Router history={this.props.history}>
                <Route path='/' component={App}>
                    <IndexRoute component={MatchSchedule}/>
                    <Route path='profile' component={Profile}/>
                    <Route path='team-leaderboard' component={TeamLeaderboard}/>
                    <Route path='user-leaderboard' component={UserLeaderboard}/>
                </Route>
            </Router>
        );
    },

    propTypes: {
        history: React.PropTypes.any.isRequired
    }
});

export default AppRouter;

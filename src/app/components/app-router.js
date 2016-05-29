import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import App from 'app/components/app';
import MainLayout from 'app/components/main-layout';
import MatchSchedule from 'match/components/match-schedule';
import Match from 'match/components/match';
import TeamLeaderboard from 'team/components/team-leaderboard';
import UserForm from 'user/components/user-form';
import UserLeaderboard from 'user/components/user-leaderboard';

const AppRouter = React.createClass({
    render() {
        return (
            <Router history={this.props.history}>
                <Route path='/' component={App}>
                    <Route component={MainLayout}>
                        <IndexRoute component={MatchSchedule}/>
                        <Route path='profile' component={UserForm}/>
                        <Route
                            path='team-leaderboard'
                            component={TeamLeaderboard}/>
                        <Route
                            path='user-leaderboard'
                            component={UserLeaderboard}/>
                    </Route>
                    <Route path='match' component={Match}/>
                </Route>
            </Router>
        );
    },

    propTypes: {
        history: React.PropTypes.any.isRequired
    }
});

export default AppRouter;

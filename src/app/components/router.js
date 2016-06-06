import React from 'react';
import {Router as ReactRouter, Route, IndexRoute} from 'react-router';
import App from 'app/components/app';
import Lobby from 'app/components/lobby';
import MatchSchedule from 'match/components/match-schedule';
import Match from 'match/components/match';
import UserForm from 'user/components/user-form';
import UserLeaderboard from 'user/components/user-leaderboard';

const AppRouter = React.createClass({
    propTypes: {
        history: React.PropTypes.any.isRequired
    },

    render() {
        return (
            <ReactRouter history={this.props.history}>
                <Route path='/' component={App}>
                    <Route component={Lobby}>
                        <IndexRoute component={MatchSchedule}/>
                        <Route path='profile' component={UserForm}/>
                        <Route
                            path='user-leaderboard'
                            component={UserLeaderboard}/>
                    </Route>
                    <Route path='match' component={Match}/>
                </Route>
            </ReactRouter>
        );
    }
});

export default AppRouter;

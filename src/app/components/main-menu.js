import React from 'react';
import {FormattedMessage} from 'react-intl';
import {NavItem, Nav} from 'react-bootstrap';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';
import Immutable from 'immutable';

const MainMenu = React.createClass({
    render() {
        const {isLoggedIn, onItemSelect} = this.props;
        let profile;

        if (isLoggedIn) {
            profile =
                <LinkContainer to='/profile'>
                    <NavItem><FormattedMessage id='mainMenu.profile'/></NavItem>
                </LinkContainer>;
        }

        return (
            <Nav onSelect={onItemSelect}>
                <IndexLinkContainer to='/'>
                    <NavItem>
                        <FormattedMessage id='mainMenu.matchSchedule'/>
                    </NavItem>
                </IndexLinkContainer>
                <LinkContainer to='/user-leaderboard'>
                    <NavItem>
                        <FormattedMessage id='mainMenu.userLeaderboard'/>
                    </NavItem>
                </LinkContainer>
                <LinkContainer to='/team-leaderboard'>
                    <NavItem>
                        <FormattedMessage id='mainMenu.teamLeaderboard'/>
                    </NavItem>
                </LinkContainer>
                {profile}
            </Nav>
        );
    },

    propTypes: {
        isLoggedIn: React.PropTypes.bool.isRequired
    }
});

export default MainMenu;

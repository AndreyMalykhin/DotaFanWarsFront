import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Image, Badge} from 'react-bootstrap';
import Immutable from 'immutable';

const Scoreboard = React.createClass({
    propTypes: {
        teams: React.PropTypes.instanceOf(Immutable.Map).isRequired
    },

    render() {
        const teams = this.props.teams;
        return (
            <Row>
                {this._renderTeam(teams.first())}
                {this._renderTeam(teams.last(), 'flipped')}
            </Row>
        );
    },

    _renderTeam(team, extraClass = null) {
        return (
            <Col xs={6} className={extraClass}>
                <Image src={team.get('logoUrl')} width={32} height={32}/>
                <span>{team.get('name')}</span>
                <Badge>{team.get('score')}</Badge>
            </Col>
        );
    }
});

export default function mapStateToProps(state, ownProps) {
    return {
        teams: state.match.get('teams')
    };
}

export default connect(mapStateToProps)(Scoreboard);

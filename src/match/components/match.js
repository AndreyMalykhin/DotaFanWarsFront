import React from 'react';
import {Col, Button, Row, Image} from 'react-bootstrap';
import {FormattedMessage, FormattedRelative} from 'react-intl';
import Immutable from 'immutable';
import {PENDING} from 'common/utils/request-status';

const Match = React.createClass({
    render() {
        const {match, isDisabled} = this.props;
        const startDate = new Date(match.get('startDate'));
        const isLive = Date.now() > startDate.getTime();
        let title;

        if (isLive) {
            title = <FormattedMessage id='match.live'/>;
        } else {
            title = <FormattedRelative
                        value={startDate}
                        updateInterval={0}/>;
        }

        const teamColumns = match.get('teams').map((team) =>
            <Col xs={5}>
                <p>{team.get('name')}</p>
                <Image src={team.get('logoUrl')} rounded responsive/>
                <Button
                    disabled={!isLive || isDisabled}
                    onClick={this._onJoin.bind(this, match.get('id'), team.get('id'))}>
                    <FormattedMessage id='match.join'/>
                </Button>
            </Col>
        );

        return (
            <li className='list-group-item'>
                <Row>
                    <Col xs={12}>{title}</Col>
                </Row>
                <Row>
                    {teamColumns.get(0)}
                    <Col xs={2}><FormattedMessage id='match.vs'/></Col>
                    {teamColumns.get(1)}
                </Row>
            </li>
        );
    },

    propTypes: {
        onJoin: React.PropTypes.func.isRequired,
        match: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        isDisabled: React.PropTypes.bool.isRequired
    },

    _onJoin(matchId, teamId) {
        this.props.onJoin(matchId, teamId);
    }
});

export default Match;

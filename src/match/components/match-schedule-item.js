import styles from 'match/styles/match-schedule-item.scss';
import React from 'react';
import {Col, Button, Row, Image} from 'react-bootstrap';
import {FormattedMessage, FormattedRelative} from 'react-intl';
import Immutable from 'immutable';
import {PENDING} from 'common/utils/request-status';

const MatchScheduleItem = React.createClass({
    render() {
        const {match, isDisabled} = this.props;
        const startDate = new Date(match.get('startDate'));
        const isLive = Date.now() > startDate.getTime();
        let title;

        if (isLive) {
            title = <FormattedMessage id='matchScheduleItem.live'/>;
        } else {
            title = <FormattedRelative value={startDate} updateInterval={0}/>;
        }

        const teamColumns = match.get('teams').map((team) => (
            <Col xs={6}>
                <p className={styles.teamName}>{team.get('name')}</p>
                <p>
                    <Image src={team.get('logoUrl')} height={64}/>
                </p>
                <Button
                    disabled={!isLive || isDisabled}
                    onClick={this._onJoin.bind(this, match.get('id'), team.get('id'))}>
                    <FormattedMessage id='matchScheduleItem.join'/>
                </Button>
            </Col>
        ));

        return (
            <li className={`list-group-item ${styles.wrapper}`}>
                <Row><Col xs={12} className={styles.header}>{title}</Col></Row>
                <Row className={styles.body}>
                    {teamColumns.first()}{teamColumns.last()}
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

export default MatchScheduleItem;

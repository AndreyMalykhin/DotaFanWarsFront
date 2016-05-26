import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Pagination, ListGroup} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';
import Immutable from 'immutable';
import Loader from 'react-loader';
import {SUCCESS, PENDING} from 'common/utils/request-status';
import Match from 'match/components/match';
import {getMatchSchedule} from 'match/actions/match-schedule-actions';
import {joinMatch} from 'match/actions/match-actions';
import {openLoginDlg} from 'user/actions/auth-actions';

const MatchSchedule = React.createClass({
    render() {
        const {
            getRequestStatus,
            matches,
            page,
            pageCount,
            onJoinMatch
        } = this.props;
        let matchList;
        let loader;
        const isDisabled = this._isDisabled();

        if (matches) {
            if (matches.size != 0) {
                matchList =
                    <ListGroup componentClass='ul'>
                        {matches.map((match) =>
                            <Match
                               match={match}
                               key={match.get('id')}
                               isDisabled={isDisabled}
                               onJoin={onJoinMatch}/>
                        )}
                    </ListGroup>;
            } else {
                matchList =
                    <p><FormattedMessage id='matchSchedule.empty'/></p>;
            }
        }

        let paginator;

        if (pageCount) {
            paginator =
                <Pagination
                    className={isDisabled && 'disabled'}
                    items={pageCount}
                    activePage={page}
                    onSelect={this._onPageSelect}/>;
        }

        return (
            <Row>
                <Col xs={12}>
                    <Loader loaded={getRequestStatus != PENDING}></Loader>
                    {matchList}
                    {paginator}
                </Col>
            </Row>
        );
    },

    componentDidMount() {
        const {onLoad, page} = this.props;
        onLoad(page);
        this._updaterId = setInterval(() => {
            onLoad(this.props.page);
        }, 60000);
    },

    componentWillUnmount() {
        clearInterval(this._updaterId);
    },

    propTypes: {
        onLoad: React.PropTypes.func.isRequired,
        onJoinMatch: React.PropTypes.func.isRequired,
        page: React.PropTypes.number.isRequired,
        joinMatchRequestStatus: React.PropTypes.string,
        getRequestStatus: React.PropTypes.string,
        matches: React.PropTypes.instanceOf(Immutable.List),
        pageCount: React.PropTypes.number,
        lastUpdateTime: React.PropTypes.number
    },

    _onPageSelect(page) {
        if (this._isDisabled()) {
            return;
        }

        this.props.onLoad(page);
    },

    _isDisabled() {
        const {joinMatchRequestStatus, getRequestStatus} = this.props;
        return joinMatchRequestStatus == PENDING
            || getRequestStatus == PENDING;
    }
});

function mapStateToProps(state, ownProps) {
    return {
        matches: state.matchSchedule.get('items'),
        getRequestStatus: state.matchSchedule.get('getRequestStatus'),
        joinMatchRequestStatus: state.match.get('joinRequestStatus'),
        page: state.matchSchedule.get('page'),
        pageCount: state.matchSchedule.get('pageCount'),
        lastUpdateTime: state.matchSchedule.get('lastUpdateTime')
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onLoad(page) {
            dispatch(getMatchSchedule(page));
        },
        onJoinMatch(matchId, teamId) {
            const onPostLogin = () => {
                dispatch(joinMatch(matchId, teamId));
            };
            dispatch(openLoginDlg(onPostLogin, onPostLogin));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchSchedule);

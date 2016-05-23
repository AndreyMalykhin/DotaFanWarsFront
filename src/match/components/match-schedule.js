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
            loadRequestStatus,
            matches,
            page,
            pageCount,
            joinMatchRequestStatus,
            onLoad,
            onJoinMatchBtnClick
        } = this.props;
        let matchList;
        let loader;

        if (matches) {
            if (matches.size != 0) {
                matchList =
                    <ListGroup componentClass='ul'>
                        {matches.map((match) =>
                            <Match
                               match={match}
                               key={match.get('id')}
                               joinRequestStatus={joinMatchRequestStatus}
                               onJoinBtnClick={onJoinMatchBtnClick}/>
                        )}
                    </ListGroup>;
            } else {
                matchList =
                    <p><FormattedMessage id='matchSchedule.empty'/></p>;
            }
        } else {
            loader = <Loader loaded={loadRequestStatus != PENDING}></Loader>;
        }

        let paginator;

        if (pageCount) {
            paginator =
                <Pagination
                    items={pageCount}
                    activePage={page}
                    onSelect={onLoad}
                    bsSize='large'/>;
        }

        return (
            <Row>
                <Col xs={12}>
                    {loader}
                    {matchList}
                    {paginator}
                </Col>
            </Row>
        );
    },

    componentDidMount() {
        this.props.onLoad(this.props.page);
        this._updaterId = setInterval(() => {
            this.props.onLoad(this.props.page);
        }, 10000);
    },

    componentWillUnmount() {
        clearInterval(this._updaterId);
    },

    propTypes: {
        onLoad: React.PropTypes.func.isRequired,
        onJoinMatchBtnClick: React.PropTypes.func.isRequired,
        page: React.PropTypes.number.isRequired,
        loadRequestStatus: React.PropTypes.string.isRequired,
        joinMatchRequestStatus: React.PropTypes.string.isRequired,
        matches: React.PropTypes.instanceOf(Immutable.List),
        pageCount: React.PropTypes.number,
        lastUpdateTime: React.PropTypes.number
    }
});

function mapStateToProps(state, ownProps) {
    return {
        matches: state.matchSchedule.get('items'),
        loadRequestStatus: state.matchSchedule.get('requestStatus'),
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
        onJoinMatchBtnClick(matchId, teamId) {
            const onPostLogin = () => {
                dispatch(joinMatch(matchId, teamId));
            };
            dispatch(openLoginDlg(onPostLogin, onPostLogin));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchSchedule);

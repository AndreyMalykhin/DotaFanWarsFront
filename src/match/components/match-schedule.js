import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Pagination, ListGroup} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';
import Immutable from 'immutable';
import Loader from 'react-loader';
import {SUCCESS, PENDING} from 'common/utils/request-status';
import MatchScheduleItem from 'match/components/match-schedule-item';
import {getMatchSchedule} from 'match/actions/match-schedule-actions';
import {openRoomPicker} from 'match/actions/match-actions';
import {openLoginDlg} from 'user/actions/auth-actions';
import RoomPicker from 'match/components/room-picker';

const MatchSchedule = React.createClass({
    propTypes: {
        onLoad: React.PropTypes.func.isRequired,
        onJoinMatch: React.PropTypes.func.isRequired,
        page: React.PropTypes.number.isRequired,
        getRequestStatus: React.PropTypes.string,
        items: React.PropTypes.instanceOf(Immutable.List),
        pageCount: React.PropTypes.number,
        lastUpdateTime: React.PropTypes.number
    },

    _updaterId: null,

    render() {
        const {
            getRequestStatus,
            items,
            page,
            pageCount,
            onJoinMatch
        } = this.props;
        let list;
        const isDisabled = this._isDisabled();
        const isRequestPending = isDisabled;

        if (items) {
            if (items.size != 0) {
                list = (
                    <ListGroup componentClass='ul'>
                        {items.map((item) => (
                            <MatchScheduleItem
                                match={item}
                                key={item.get('id')}
                                isDisabled={isDisabled}
                                onJoin={onJoinMatch}/>
                        ))}
                    </ListGroup>
                );
            } else {
                list = <p><FormattedMessage id='matchSchedule.empty'/></p>;
            }
        }

        let paginator;

        if (pageCount) {
            paginator = (
                <Pagination
                    className={isDisabled && 'disabled'}
                    items={pageCount}
                    activePage={page}
                    onSelect={this._onPageSelect}/>
            );
        }

        return (
            <Row>
                <Col xs={12}>
                    <Loader loaded={!isRequestPending}></Loader>
                    {list}
                    {paginator}
                    <RoomPicker/>
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

    _onPageSelect(page) {
        if (this._isDisabled()) {
            return;
        }

        this.props.onLoad(page);
    },

    _isDisabled() {
        return this.props.getRequestStatus == PENDING;
    }
});

function mapStateToProps(state, ownProps) {
    return {
        items: state.matchSchedule.get('items'),
        getRequestStatus: state.matchSchedule.get('getRequestStatus'),
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
                dispatch(openRoomPicker(matchId, teamId));
            };
            const onAlreadyLoggedIn = onPostLogin;
            dispatch(openLoginDlg(onPostLogin, onAlreadyLoggedIn));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchSchedule);

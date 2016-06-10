import styles from 'match/styles/match-schedule.scss';
import paginationStyles from 'common/styles/pagination.scss';
import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Pagination, ListGroup} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';
import Immutable from 'immutable';
import Loader from 'common/components/loader';
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
        isLoading: React.PropTypes.bool.isRequired,
        addRoomPicker: React.PropTypes.bool.isRequired,
        items: React.PropTypes.instanceOf(Immutable.List),
        pageCount: React.PropTypes.number,
        lastUpdateTime: React.PropTypes.number
    },

    _updateIntervalId: null,

    render() {
        const {
            items,
            page,
            pageCount,
            isLoading,
            addRoomPicker,
            onJoinMatch,
            onLoad
        } = this.props;
        let itemsView;

        if (items) {
            if (items.size != 0) {
                itemsView = (
                    <ListGroup componentClass='ul'>
                        {items.map((item) => (
                            <MatchScheduleItem
                                match={item}
                                key={item.get('id')}
                                isDisabled={isLoading}
                                onJoin={onJoinMatch}/>
                        ))}
                    </ListGroup>
                );
            } else {
                itemsView = <p><FormattedMessage id='matchSchedule.empty'/></p>;
            }
        }

        let paginator;

        if (pageCount > 1) {
            paginator = (
                <div className={styles.paginationWrapper}>
                    <Pagination
                        className={isLoading ? paginationStyles.disabled : null}
                        items={pageCount}
                        activePage={page}
                        onSelect={isLoading ? null : onLoad}/>
                </div>
            );
        }

        return (
            <Row>
                <Col xs={12} sm={8} smOffset={2}>
                    <Loader isLoaded={!isLoading}></Loader>
                    {itemsView}
                    {paginator}
                    {addRoomPicker && <RoomPicker/>}
                </Col>
            </Row>
        );
    },

    componentDidMount() {
        const {onLoad, page} = this.props;
        onLoad(page);
        this._updateIntervalId = setInterval(() => {
            onLoad(this.props.page);
        }, 60000);
    },

    componentWillUnmount() {
        clearInterval(this._updateIntervalId);
    }
});

function mapStateToProps(state, ownProps) {
    const {roomPicker, matchSchedule} = state;
    return {
        items: matchSchedule.get('items'),
        isLoading: matchSchedule.get('getRequestStatus') == PENDING,
        page: matchSchedule.get('page'),
        pageCount: matchSchedule.get('pageCount'),
        lastUpdateTime: matchSchedule.get('lastUpdateTime'),
        addRoomPicker: roomPicker.get('matchId') != null
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

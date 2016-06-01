import React from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader';
import {Modal, ListGroup, ListGroupItem} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';
import Immutable from 'immutable';
import {PENDING} from 'common/utils/request-status';
import {getMatchRooms, closeRoomPicker, joinMatch} from
    'match/actions/match-actions';

const RoomPicker = React.createClass({
    propTypes: {
        onClose: React.PropTypes.func.isRequired,
        onPick: React.PropTypes.func.isRequired,
        isOpen: React.PropTypes.bool.isRequired,
        matchId: React.PropTypes.string,
        teamId: React.PropTypes.string,
        joinMatchRequestStatus: React.PropTypes.string,
        getRoomsRequestStatus: React.PropTypes.string,
        rooms: React.PropTypes.instanceOf(Immutable.List)
    },

    render() {
        const {
            isOpen,
            rooms,
            teamId,
            joinMatchRequestStatus,
            getRoomsRequestStatus,
            onClose,
            onPick
        } = this.props;
        const isRequestPending = getRoomsRequestStatus == PENDING
            || joinMatchRequestStatus == PENDING;
        const isDisabled = isRequestPending;
        return (
            <Modal show={isOpen} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormattedMessage id='roomPicker.title'/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Loader loaded={!isRequestPending}/>
                    <ListGroup>
                        {rooms && rooms.map((room) => (
                            <ListGroupItem
                                key={room.get('id')}
                                disabled={isDisabled}
                                onClick={onPick.bind(this, room, teamId)}>
                                {room.get('name')}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </Modal.Body>
            </Modal>
        );
    },

    componentWillReceiveProps(newProps) {
        const {matchId, onLoad} = this.props;

        if (newProps.matchId == matchId) {
            return;
        }

        onLoad(newProps.matchId);
    }
});

function mapStateToProps(state, ownProps) {
    const {roomPicker, match} = state;
    return {
        isOpen: roomPicker.get('isOpen'),
        rooms: roomPicker.get('rooms'),
        teamId: roomPicker.get('teamId'),
        matchId: roomPicker.get('matchId'),
        getRoomsRequestStatus: roomPicker.get('getRoomsRequestStatus'),
        joinMatchRequestStatus: match && match.get('joinRequestStatus')
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onLoad(matchId) {
            dispatch(getMatchRooms(matchId));
        },
        onClose() {
            dispatch(closeRoomPicker());
        },
        onPick(room, teamId) {
            dispatch(joinMatch(room, teamId)).then(() => {
                dispatch(closeRoomPicker());
            });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomPicker);

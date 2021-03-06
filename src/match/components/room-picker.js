import styles from 'match/styles/room-picker.scss';
import React from 'react';
import {connect} from 'react-redux';
import Loader from 'common/components/loader';
import {Modal, ListGroup, ListGroupItem} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';
import Immutable from 'immutable';
import {PENDING} from 'common/utils/request-status';
import {getMatchRooms, closeRoomPicker, joinMatch} from
    'match/actions/match-actions';

const Header = Modal.Header;
const Body = Modal.Body;
const Title = Modal.Title;

const RoomPicker = React.createClass({
    propTypes: {
        onClose: React.PropTypes.func.isRequired,
        onPick: React.PropTypes.func.isRequired,
        onLoad: React.PropTypes.func.isRequired,
        isOpen: React.PropTypes.bool.isRequired,
        isLoading: React.PropTypes.bool.isRequired,
        matchId: React.PropTypes.string.isRequired,
        teamId: React.PropTypes.string.isRequired,
        rooms: React.PropTypes.instanceOf(Immutable.List)
    },

    render() {
        const {
            isOpen,
            rooms,
            teamId,
            isLoading,
            onClose,
            onPick
        } = this.props;
        return (
            <Modal show={isOpen} onHide={onClose} className={styles.wrapper}>
                <Header closeButton>
                    <Title>
                        <FormattedMessage id='roomPicker.title'/>
                    </Title>
                </Header>
                <Body>
                    <Loader isLoaded={!isLoading}/>
                    <ListGroup>
                        {rooms && rooms.map((room) => (
                            <ListGroupItem
                                className={styles.listItem}
                                key={room.get('id')}
                                disabled={isLoading}
                                onClick={onPick.bind(this, room, teamId)}
                            >
                                {room.get('name')}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </Body>
            </Modal>
        );
    },

    componentDidMount() {
        const {matchId, onLoad} = this.props;
        onLoad(matchId);
    },

    componentWillReceiveProps(newProps) {
        const {matchId, onLoad} = this.props;

        if (newProps.matchId == matchId) {
            return;
        }

        onLoad(newProps.matchId);
    }
});

function mapStateToProps(state) {
    const {roomPicker, requestStatuses} = state;
    const isLoading = roomPicker.get('getRoomsRequestStatus') == PENDING
        || requestStatuses.get('match.joinMatch') == PENDING;
    return {
        isOpen: roomPicker.get('isOpen'),
        rooms: roomPicker.get('rooms'),
        teamId: roomPicker.get('teamId'),
        matchId: roomPicker.get('matchId'),
        isLoading: isLoading
    };
}

function mapDispatchToProps(dispatch) {
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

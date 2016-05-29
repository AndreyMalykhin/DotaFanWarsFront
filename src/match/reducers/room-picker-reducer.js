import Immutable from 'immutable';
import {PENDING, FAIL, SUCCESS} from 'common/utils/request-status';

export default function roomPickerReducer(roomPicker = null, action) {
    switch (action.type) {
    case 'OPEN_ROOM_PICKER':
        const {matchId, teamId} = action.payload;
        return roomPicker.merge({
            isOpen: true,
            matchId: matchId,
            teamId: teamId
        });
    case 'CLOSE_ROOM_PICKER':
        return roomPicker.set('isOpen', false);
    case 'GET_MATCH_ROOMS_REQUEST':
        return roomPicker.set('getRoomsRequestStatus', PENDING);
    case 'GET_MATCH_ROOMS_RESPONSE':
        if (action.error) {
            return roomPicker.set('getRoomsRequestStatus', FAIL);
        }

        roomPicker = roomPicker.set('getRoomsRequestStatus', SUCCESS);

        if (action.payload.status != 200) {
            return roomPicker;
        }

        return roomPicker.set('rooms', Immutable.fromJS(action.payload.data));
    }

    return roomPicker;
}

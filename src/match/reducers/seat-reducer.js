import Immutable from 'immutable';

export default function seatReducer(seats = null, action) {
    switch (action.type) {
    case 'UPDATE_SEATS':
        return seats.withMutations((seats) => {
            for (let seat of action.payload) {
                seats.mergeDeepIn([seat.id], seat);
            }
        });
    }

    return seats;
}

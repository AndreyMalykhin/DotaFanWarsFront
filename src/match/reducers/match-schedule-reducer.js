import {PENDING, FAIL, SUCCESS} from 'common/utils/request-status';

export default function matchScheduleReducer(schedule = null, action) {
    switch (action.type) {
    case 'GET_MATCH_SCHEDULE_REQUEST':
        return schedule.set('getRequestStatus', PENDING);
    case 'GET_MATCH_SCHEDULE_RESPONSE':
        if (action.error) {
            return schedule.set('getRequestStatus', FAIL);
        }

        schedule = schedule.set('getRequestStatus', SUCCESS);

        if (action.payload.status != 200) {
            return schedule;
        }

        const {items, page, pageCount, lastUpdateTime} = action.payload.data;
        return schedule.merge({
            items: items,
            page: page,
            pageCount: pageCount,
            lastUpdateTime: lastUpdateTime
        });
    }

    return schedule;
}

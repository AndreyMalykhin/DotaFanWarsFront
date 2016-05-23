import {PENDING, FAIL, SUCCESS} from 'common/utils/request-status';

export default function matchScheduleReducer(schedule = null, action) {
    switch (action.type) {
    case 'GET_MATCH_SCHEDULE_REQUEST':
        return schedule.merge({
            requestStatus: PENDING,
            page: action.payload.page
        });
    case 'GET_MATCH_SCHEDULE_RESPONSE':
        if (action.error) {
            return schedule.set('requestStatus', FAIL);
        }

        if (action.payload.status != 200) {
            return schedule;
        }

        const {schedule: items, pageCount} = action.payload.data;
        return schedule.mergeDeep({
            items: items,
            pageCount: pageCount,
            requestStatus: SUCCESS,
            lastUpdateTime: Date.now()
        });
    }

    return schedule;
}

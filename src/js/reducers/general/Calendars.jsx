'use strict';

export function calendarSuccess(state = [], action) {
    switch (action.type) {
        case 'CALENDAR_SUCCESS':
            return action.response;
            break;
        default:
            return state;
    }
}

export function calendarHasErrored(state = false, action) {
    switch (action.type) {
        case 'CALENDAR_HAS_ERRORED':
            return action.hasErrored;
            break;
        default:
            return state;
    }
}

export function calendarIsLoading(state = false, action) {
    switch (action.type) {
        case 'CALENDAR_IS_LOADING':
            return action.isLoading;
            break;
        default:
            return state;
    }
}
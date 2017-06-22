'use strict';

export function logSuccess(state = [], action) {
    switch (action.type) {
        case 'LOG_SUCCESS':
            return action.response;
            break;
        default:
            return state;
    }
}

export function logHasErrored(state = false, action) {
    switch (action.type) {
        case 'LOG_HAS_ERRORED':
            return action.hasErrored;
            break;
        default:
            return state;
    }
}
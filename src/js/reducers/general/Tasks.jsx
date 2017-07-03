'use strict';

export function taskSuccess(state = [], action) {
    switch (action.type) {
        case 'TASK_SUCCESS':
            return action.response;
            break;
        default:
            return state;
    }
}

export function taskHasErrored(state = false, action) {
    switch (action.type) {
        case 'TASK_HAS_ERRORED':
            return action.hasErrored;
            break;
        default:
            return state;
    }
}

export function taskIsLoading(state = false, action) {
    switch (action.type) {
        case 'TASK_IS_LOADING':
            return action.isLoading;
            break;
        default:
            return state;
    }
}
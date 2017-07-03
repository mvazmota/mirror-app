'use strict';

export function listSuccess(state = [], action) {
    switch (action.type) {
        case 'LIST_SUCCESS':
            return action.response;
            break;
        default:
            return state;
    }
}

export function listHasErrored(state = false, action) {
    switch (action.type) {
        case 'LIST_HAS_ERRORED':
            return action.hasErrored;
            break;
        default:
            return state;
    }
}

export function listIsLoading(state = false, action) {
    switch (action.type) {
        case 'LIST_IS_LOADING':
            return action.isLoading;
            break;
        default:
            return state;
    }
}
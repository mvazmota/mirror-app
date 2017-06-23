'use strict';

export function userSuccess(state = [], action) {
    switch (action.type) {
        case 'USER_SUCCESS':
            return action.response;
            break;
        default:
            return state;
    }
}

export function userHasErrored(state = false, action) {
    switch (action.type) {
        case 'USER_HAS_ERRORED':
            return action.hasErrored;
            break;
        default:
            return state;
    }
}

export function userIsLoading(state = false, action) {
    switch (action.type) {
        case 'USER_IS_LOADING':
            return action.isLoading;
            break;
        default:
            return state;
    }
}
'use strict';

export function errorCode(state = {}, action) {
    switch (action.type) {
        case 'ERROR_CODE':
            return action.response;
            break;
        default:
            return state;
    }
}

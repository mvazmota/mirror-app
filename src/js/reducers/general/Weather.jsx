'use strict';

export function weatherSuccess(state = [], action) {
    switch (action.type) {
        case 'WEATHER_SUCCESS':
            return action.response;
            break;
        default:
            return state;
    }
}

export function weatherIsLoading(state = false, action) {
    switch (action.type) {
        case 'WEATHER_IS_LOADING':
            return action.isLoading;
            break;
        default:
            return state;
    }
}

export function weatherHasErrored(state = false, action) {
    switch (action.type) {
        case 'WEATHER_HAS_ERRORED':
            return action.hasErrored;
            break;
        default:
            return state;
    }
}
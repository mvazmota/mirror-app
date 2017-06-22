'use strict';

export function loginSuccess(state = [], action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return action.response;
            break;
        default:
            return state;
    }
}

export function loginIsLoading(state = false, action) {
    switch (action.type) {
        case 'LOGIN_IS_LOADING':
            return action.isLoading;
            break;
        default:
            return state;
    }
}

export function loginHasErrored(state = false, action) {
    switch (action.type) {
        case 'LOGIN_HAS_ERRORED':
            return action.hasErrored;
            break;
        default:
            return state;
    }
}

export function logoutSuccess(state = [], action) {
    switch (action.type) {
        case 'LOGOUT_SUCCESS':
            return action.response;
            break;
        default:
            return state;
    }
}

export function logoutIsLoading(state = false, action) {
    switch (action.type) {
        case 'LOGOUT_IS_LOADING':
            return action.isLoading;
            break;
        default:
            return state;
    }
}

export function logoutHasErrored(state = false, action) {
    switch (action.type) {
        case 'LOGOUT_HAS_ERRORED':
            return action.hasErrored;
            break;
        default:
            return state;
    }
}

// ADVERTISEMENTS.........................................................................

export function advertisementSuccess(state = [], action) {
    switch (action.type) {
        case 'ADVERTISEMENT_SUCCESS':
            return action.response;
            break;
        default:
            return state;
    }
}

export function advertisementHasErrored(state = false, action) {
    switch (action.type) {
        case 'ADVERTISEMENT_HAS_ERRORED':
            return action.hasErrored;
            break;
        default:
            return state;
    }
}

// VIDEOSBOX.........................................................................

export function videosSuccess(state = [], action) {
    switch (action.type) {
        case 'VIDEOS_SUCCESS':
            return action.response;
            break;
        default:
            return state;
    }
}

export function videosHasErrored(state = false, action) {
    switch (action.type) {
        case 'VIDEOS_HAS_ERRORED':
            return action.hasErrored;
            break;
        default:
            return state;
    }
}

export function videosIsLoading(state = false, action) {
    switch (action.type) {
        case 'VIDEOS_IS_LOADING':
            return action.isLoading;
            break;
        default:
            return state;
    }
}

//-------Boot State______________

export function bootState(state = false, action) {
    switch (action.type) {
        case 'BOOT_STATE':
            return action.state;
            break;
        default:
            return state;
    }
}

//-------Channel State______________

export function channelState(state = [], action) {
    switch (action.type) {
        case 'CHANNEL_STATE':
            return action.response;
            break;
        default:
            return state;
    }
}

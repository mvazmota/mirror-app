'use strict';
import {store} from '../index.jsx';

//ACTION CREATORS
export function socket(response, listener) {
    response.listener = listener;
    return {
        type: 'SOCKET',
        response
    };
}

//ACTION CALLS
export function socketListener(data, listener) {
    store.dispatch(socket(data, listener));
}

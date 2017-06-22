'use strict';

import {store} from '../index.jsx';
//ACTION CREATORS
export function errorCode(response) {
    return {
        type: 'ERROR_CODE',
        response
    };
}

//ACTION CALLS
export function errors(error) {
    store.dispatch(errorCode(error));
}
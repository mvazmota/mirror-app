'use strict';

import axios from 'axios';
import query_string from 'query-string';
import Auth from '../auth';
import {errors, errorCode} from './Errors';

//ACTION CREATORS
export function logSuccess(response) {
    return {
        type: 'LOG_SUCCESS',
        response
    };
}

export function logHasErrored(bool) {
    return {
        type: 'LOG_HAS_ERRORED',
        hasErrored: bool
    };
}


//ACTION CALLS
export function log(data) {

    return (dispatch) => {
        axios({
            method:'post',
            url:`http://api_mysql.tv4e.pt/api/logs/${Auth.getId()}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept' : 'application/x-www-form-urlencoded'
            },
            data: query_string.stringify(data)
        })
        .then((response) => {

            if (response.status != 200) {
                console.log('error');
                throw Error(response);
            }

            response = response.data;
            dispatch(logSuccess(response));
        })
        .catch((error) => {
            if (error.response) {
                errors(error.response.status);
            }
            console.log('error', error.statusText);
            dispatch(logHasErrored(true));
        });
    };
}
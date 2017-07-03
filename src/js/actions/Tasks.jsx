'use strict';

import axios from 'axios';
import query_string from 'query-string';
import Auth from '../auth';

//ACTION CREATORS
export function taskSuccess(response) {
    return {
        type: 'TASK_SUCCESS',
        response
    };
}

export function taskHasErrored(bool) {
    return {
        type: 'TASK_HAS_ERRORED',
        hasErrored: bool
    };
}

export function taskIsLoading(bool) {
    return {
        type: 'TASK_IS_LOADING',
        isLoading: bool
    };
}

//ACTION CALLS
export function getTask(payload) {

    return (dispatch) => {
        dispatch(taskIsLoading(true));
        axios({
            method:'get',
            url:`http://mirror_api.mmota.online/api/task`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept' : 'application/x-www-form-urlencoded',
                'X-Requested-With' : 'XMLHttpRequest'
        }
        })
            .then((response) => {
                if (response.status != 200) {
                    console.log('error');
                    throw Error(response.statusText);
                }
                dispatch(taskIsLoading(false));
                dispatch(taskSuccess(response.data));
            })
            .catch(() => dispatch(taskHasErrored(true)));
    };
}
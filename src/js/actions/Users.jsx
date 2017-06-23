'use strict';

import axios from 'axios';
import query_string from 'query-string';
import Auth from '../auth';

//ACTION CREATORS
export function userSuccess(response) {
    return {
        type: 'USER_SUCCESS',
        response
    };
}

export function userHasErrored(bool) {
    return {
        type: 'USER_HAS_ERRORED',
        hasErrored: bool
    };
}

export function userIsLoading(bool) {
    return {
        type: 'USER_IS_LOADING',
        isLoading: bool
    };
}

//ACTION CALLS
export function getUser(payload) {

    return (dispatch) => {
        dispatch(userIsLoading(true));
        axios({
            method:'get',
            url:`http://mirror_api.mmota.online/api/user`,
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
                dispatch(userIsLoading(false));
                dispatch(userSuccess(response.data));
            })
            .catch(() => dispatch(userHasErrored(true)));
    };
}
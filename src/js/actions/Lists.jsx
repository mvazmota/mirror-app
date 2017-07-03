'use strict';

import axios from 'axios';
import query_string from 'query-string';
import Auth from '../auth';

//ACTION CREATORS
export function listSuccess(response) {
    return {
        type: 'LIST_SUCCESS',
        response
    };
}

export function listHasErrored(bool) {
    return {
        type: 'LIST_HAS_ERRORED',
        hasErrored: bool
    };
}

export function listIsLoading(bool) {
    return {
        type: 'LIST_IS_LOADING',
        isLoading: bool
    };
}

//ACTION CALLS
export function getList(payload) {

    return (dispatch) => {
        dispatch(listIsLoading(true));
        axios({
            method:'get',
            url:`http://mirror_api.mmota.online/api/list`,
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
                dispatch(listIsLoading(false));
                dispatch(listSuccess(response.data));
            })
            .catch(() => dispatch(listHasErrored(true)));
    };
}
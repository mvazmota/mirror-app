'use strict';

import axios from 'axios';
import query_string from 'query-string';
import Auth from '../auth';

//ACTION CREATORS
export function calendarSuccess(response) {
    return {
        type: 'CALENDAR_SUCCESS',
        response
    };
}

export function calendarHasErrored(bool) {
    return {
        type: 'CALENDAR_HAS_ERRORED',
        hasErrored: bool
    };
}

export function calendarIsLoading(bool) {
    return {
        type: 'CALENDAR_IS_LOADING',
        isLoading: bool
    };
}

//ACTION CALLS
export function getCalendar(payload) {

    return (dispatch) => {
        dispatch(calendarIsLoading(true));
        axios({
            method:'get',
            url:`http://mirror_api.mmota.online/api/calendar`,
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
                dispatch(calendarIsLoading(false));
                dispatch(calendarSuccess(response.data));
            })
            .catch(() => dispatch(calendarHasErrored(true)));
    };
}
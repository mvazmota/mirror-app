'use strict';

import axios from 'axios';
import query_string from 'query-string';
import Auth from '../auth';
import {errors, errorCode} from './Errors';

//ACTION CREATORS
export function loginSuccess(response) {
    return {
        type: 'LOGIN_SUCCESS',
        response
    };
}

export function loginHasErrored(bool) {
    return {
        type: 'LOGIN_HAS_ERRORED',
        hasErrored: bool
    };
}

export function loginIsLoading(bool) {
    return {
        type: 'LOGIN_IS_LOADING',
        isLoading: bool
    };
}

//ACTION CALLS
export function login() {
    // if(Auth.loggedIn()){
    //     return (dispatch) => {dispatch(loginSuccess(Auth.getToken()));};
    // }

    let payload = {
        grant_type: 'password',
        client_id:2,
        client_secret: '2swKu8IxdF2BrTKXJUamnotBuC1dda8c1pcoZOVU',
        username: 'the.misterie@gmail.com',
        password: 'madiba'
    };

    return (dispatch) => {
        dispatch(loginIsLoading(true));
        axios({
            method:'post',
            url:'http://api_mysql.tv4e.pt/oauth/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept' : 'application/x-www-form-urlencoded'
            },
            data: query_string.stringify(payload)
        })
        .then((response) => {

            if (response.status != 200) {
                console.log('error');
                throw Error(response);
            }

            response = response.data;

            dispatch(loginIsLoading(false));
            Auth.setToken(response.access_token);
            dispatch(loginSuccess(response));
        })
        .catch((error) => {
            if (error.response) {
                errors(error.response.status);
            }
            console.log('error', error.statusText);
            dispatch(loginHasErrored(true));
        });
    };
}


//ACTION CREATORS
export function logoutSuccess(response) {
    return {
        type: 'LOGOUT_SUCCESS',
        response
    };
}

export function logoutHasErrored(bool) {
    return {
        type: 'LOGOUT_HAS_ERRORED',
        hasErrored: bool
    };
}

export function logoutIsLoading(bool) {
    return {
        type: 'LOGOUT_IS_LOADING',
        isLoading: bool
    };
}

//ACTION CALLS
export function logout() {
    let token = localStorage.token;

    if(!Auth.loggedIn()){
        return null;
    }

    return (dispatch) => {
        dispatch(logoutIsLoading(true));
        axios({
            method:'get',
            url:'http://api_mysql.tv4e.pt/api/user/logout',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept' : 'application/x-www-form-urlencoded',
                'X-Requested-With' : 'XMLHttpRequest',
                'Authorization' : 'Bearer '  + token
            }
        })
        .then((response) => {
            if (response.status != 200) {
                console.log('error');
                throw Error(response.statusText);
            }

            dispatch(logoutIsLoading(false));
            Auth.logout();
            dispatch(logoutSuccess(response));
        })
        .catch(() => dispatch(logoutHasErrored(true)));
    };
}

// ADVERTISEMENTS.........................................................................


//ACTION CREATORS
export function advertisementSuccess(response) {
    return {
        type: 'ADVERTISEMENT_SUCCESS',
        response
    };
}

export function advertisementHasErrored(bool) {
    return {
        type: 'ADVERTISEMENT_HAS_ERRORED',
        hasErrored: bool
    };
}

//ACTION CALLS
export function advertisement(payload) {

    return (dispatch) => {
        axios({
            method:'post',
            url:`http://api_mysql.tv4e.pt/api/boxes/video/${Auth.getId()}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept' : 'application/x-www-form-urlencoded',
                'X-Requested-With' : 'XMLHttpRequest'
            },
            data: query_string.stringify(payload)
        })
            .then((response) => {
                if (response.status != 200) {
                    console.log('error');
                    throw Error(response.statusText);
                }

                dispatch(advertisementSuccess(response));
            })
            .catch(() => dispatch(advertisementHasErrored(true)));
    };
}


// VIDEOSBOX.........................................................................


//ACTION CREATORS
export function videosSuccess(response) {
    return {
        type: 'VIDEOS_SUCCESS',
        response
    };
}

export function videosHasErrored(bool) {
    return {
        type: 'VIDEOS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function videosIsLoading(bool) {
    return {
        type: 'VIDEOS_IS_LOADING',
        isLoading: bool
    };
}

//ACTION CALLS
export function videos(payload) {

    return (dispatch) => {
        dispatch(videosIsLoading(true));
        axios({
            method:'get',
            url:`http://api_mysql.tv4e.pt/api/boxes/videos/${Auth.getId()}`,
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
                dispatch(videosIsLoading(false));
                dispatch(videosSuccess(response.data));
            })
            .catch(() => dispatch(videosHasErrored(true)));
    };
}

//--------------------ACTION CHECK BOOT STATE---------------------------

//ACTION CREATORS
export function bootState(bool) {
    return {
        type: 'BOOT_STATE',
        state: bool
    };
}


//ACTION CALLS
export function setBoot(bool) {
    return (dispatch) => {
        dispatch(bootState(bool));
    };
}

//--------------------ACTION CHANNEL---------------------------

//ACTION CREATORS
export function channelState(response) {
    return {
        type: 'CHANNEL_STATE',
        response
    };
}


//ACTION CALLS
export function setChannel(channel) {
    return (dispatch) => {
        dispatch(channelState(channel));
    };
}
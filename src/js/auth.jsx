'use strict';

module.exports = {

    setToken(token) {
        localStorage.token = token;
        return localStorage.token;
    },

    getToken() {
        return localStorage.token;
    },

    setId(id) {
        localStorage.id = id;
        return localStorage.id;
    },

    getId() {
        return localStorage.id;
    },

    logout() {
        delete localStorage.token;
        delete localStorage.id;
    },

    loggedIn() {
        //@TODO checK if hasn't expired and then log in
        return !!localStorage.token;
    },

};
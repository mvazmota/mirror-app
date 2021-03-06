import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import _ from 'lodash';

import { Provider } from 'react-redux';
import Store from'./store/Store';

import Main from './containers/Main';

require('../styles/global.scss');

export const store = Store();

store.subscribe(()=>{
    {/*if(store.getState().loginSuccess.access_token){*/}
        {/*if (Auth.loggedIn()) {*/}
            {/*browserHistory.replace({*/}
                {/*pathname: '/',*/}
            {/*});*/}
        {/*}*/}
    {/*}*/}

    {/*if(store.getState().logoutSuccess.status == 200){*/}
        {/*if (!Auth.loggedIn()) {*/}
            {/*browserHistory.replace({*/}
                {/*pathname: '/',*/}
            {/*});*/}
        {/*}*/}
    // }
    //
    // if(store.getState().errorCode == 401 || store.getState().errorCode == 500){
    //     Auth.logout();
    //     browserHistory.replace({
    //         pathname: '/',
    //     });
    // }
});

ReactDom.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Main} />
        </Router>
    </Provider>,
    document.getElementById('root')
);

function _requireAuth() {
    // if (!Auth.loggedIn()) {
    //     browserHistory.push('/');
    // }
}

function _checkAuth() {
    // if (Auth.loggedIn()) {
    //     browserHistory.push('/');
    // }
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

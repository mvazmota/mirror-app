import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Main from './../components/Main';

import * as Profile from './../actions/Profile';
import * as Logs from './../actions/Logs';
import * as Weather from './../actions/Weather';

const mapStateToProps = function(state) {
    return {
        actionData:{
            profiles:{
                items: state.loginDataSuccess,
                hasErrored: state.loginHasErrored,
                isLoading: state.loginIsLoading
            },
            weather:{
                items: state.weatherSuccess,
                hasErrored: state.weatherHasErrored,
                isLoading: state.weatherIsLoading
            },
            bootState:{
                state: state.bootState,
            },
           channelState:{
                items: state.channelState,
            }
        }
    };
};

const mapDispatchToProps = function(dispatch) {

    let Actions = _.extend({},
        Profile,
        Logs,
        Weather
    );

    return {actionCreators: bindActionCreators(Actions, dispatch)};
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
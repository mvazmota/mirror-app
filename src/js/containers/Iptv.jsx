import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Iptv from './../components/Iptv';

import * as Profile from './../actions/Profile';
import * as Socket from './../actions/Socket';
import * as Logs from './../actions/Logs';
import * as Weather from './../actions/Weather';

const mapStateToProps = function(state) {
    return {
        actionData:{
            socket:{
                SendVideos: state.socket.SendVideos,
                SendHdmiState: state.socket.SendHdmiState
            },
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
        Socket,
        Weather
    );

    return {actionCreators: bindActionCreators(Actions, dispatch)};
};

export default connect(mapStateToProps, mapDispatchToProps)(Iptv);
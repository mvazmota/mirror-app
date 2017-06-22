import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OverlayScreen from './../components/splash/OverlayScreen';

import * as Socket from './../actions/Socket';
import * as Logs from './../actions/Logs';
import * as Weather from './../actions/Weather';

const mapStateToProps = function(state) {
    return {
        actionData:{
            socket:{
                SendVideos: state.socket.SendVideos
            },
            weather:{
                items: state.weatherSuccess,
                hasErrored: state.weatherHasErrored,
                isLoading: state.weatherIsLoading
            }
        }
    };
};

const mapDispatchToProps = function(dispatch) {

    let Actions = _.extend({},
        Logs,
        Socket,
        Weather
    );

    return {actionCreators: bindActionCreators(Actions, dispatch)};
};

export default connect(mapStateToProps, mapDispatchToProps)(OverlayScreen);
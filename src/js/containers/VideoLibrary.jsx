import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import VideoLibrary from './../components/library/VideoLibrary';

import * as Profile from './../actions/Profile';
import * as Socket from './../actions/Socket';
import * as Logs from './../actions/Logs';

const mapStateToProps = function(state) {
    return {
        actionData:{
            socket:{
                SendVideos: state.socket.SendVideos
            },
            videos:{
                items: state.videosSuccess,
                hasErrored: state.videosHasErrored,
                isLoading: state.videosIsLoading
            }
        }
    };
};

const mapDispatchToProps = function(dispatch) {

    let Actions = _.extend({},
        Profile,
        Logs,
        Socket
    );

    return {actionCreators: bindActionCreators(Actions, dispatch)};
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoLibrary);
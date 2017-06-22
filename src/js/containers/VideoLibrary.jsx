import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import VideoLibrary from './../components/library/VideoLibrary';

import * as Profile from './../actions/Profile';
import * as Logs from './../actions/Logs';

const mapStateToProps = function(state) {
    return {
        actionData:{
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
        Logs
    );

    return {actionCreators: bindActionCreators(Actions, dispatch)};
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoLibrary);
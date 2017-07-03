import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from './../components/Main';

import * as Weather from './../actions/Weather';
import * as Users from './../actions/Users';
import * as Lists from './../actions/Lists';
import * as Tasks from './../actions/Tasks';

const mapStateToProps = function(state) {
    return {
        actionData:{
            weather:{
                items: state.weatherSuccess,
                hasErrored: state.weatherHasErrored,
                isLoading: state.weatherIsLoading
            },
            users:{
                items: state.userSuccess,
                hasErrored: state.userHasErrored,
                isLoading: state.userIsLoading
            },
            lists:{
                items: state.listSuccess,
                hasErrored: state.listHasErrored,
                isLoading: state.listIsLoading
            },
            tasks:{
                items: state.taskSuccess,
                hasErrored: state.taskHasErrored,
                isLoading: state.taskIsLoading
            },
        }
    };
};

const mapDispatchToProps = function(dispatch) {

    let Actions = _.extend({},
        Weather,
        Users,
        Lists,
        Tasks,
    );

    return {actionCreators: bindActionCreators(Actions, dispatch)};
};

export default connect(mapStateToProps, mapDispatchToProps,null,{withRef:true})(Main);
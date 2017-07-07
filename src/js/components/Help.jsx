'use strict';

import React from 'react';
import {Row, Column, Icon, Button} from 'react-foundation';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Tasks extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {


        return (
            <div className="help">
            <ReactCSSTransitionGroup
                        component="div"
                        transitionName="fade"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                        transitionAppear={true}
                        transitionAppearTimeout={1000}
                    >
                <img src={require("../../assets/images/help2.gif")} />
                </ReactCSSTransitionGroup>
            </div>
        );
    };

};


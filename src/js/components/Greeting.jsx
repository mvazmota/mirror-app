'use strict';

import React from 'react';
import {Row, Column, Icon, Button} from 'react-foundation';
import _ from 'lodash';

export default class Greeting extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        let hour =  new Date().getHours();
        let message = 'Bom dia';
        if (hour > 12 && hour < 20){
            message = 'Boa tarde';
        } else if (hour > 20 || hour < 6) {
            message = 'Boa noite';
        }

        // let userName = this.props.user.name;
        let userName = !_.isEmpty(this.props.user)? <div className="p-greeting"><p>{message}&nbsp;</p><p>{this.props.user.name} :)</p></div>:'';

        return (
            <div className="greeting">
                {userName}
            </div>
        );
    };
};


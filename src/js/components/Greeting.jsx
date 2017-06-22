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

    componentWillMount(){
    }

    render() {
        let hour =  new Date().getHours();
        let message = 'Bom dia';
        if (hour > 12 && hour < 20){
            message = 'Boa tarde';
        } else if (hour > 20 || hour < 6) {
            message = 'Boa noite';
        }


        return (
            <div className="greeting">
                <p>{message}!</p>
            </div>
        );
    };
};


'use strict';

import React from 'react';
import {Row, Column, Icon, Button} from 'react-foundation';
import _ from 'lodash';

export default class Shopping extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentWillMount(){
        console.log();
    }

    render() {

        return (
            <div className="shopping">
                <p>SHOPPING</p>
            </div>
        );
    };

};


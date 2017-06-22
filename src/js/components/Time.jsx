'use strict';

import React from 'react';
import {Row, Column, Icon, Button} from 'react-foundation';
import _ from 'lodash';

export default class Time extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentWillMount(){
    }

    render() {

        let month =  new Date().getMonth();
        let year =  new Date().getFullYear();
        let day =  new Date().getDay();
        let dayNr = new Date().getDate();
        let hour =  new Date().getHours();
        let minute =  new Date().getMinutes().toString().length == 1 ?`0${new Date().getMinutes()}`:`${new Date().getMinutes()}`;
        let monthsPT = ['Janeiro', 'Fevereiro', 'Março','Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

        return (
            <div className="time">
                <p>{hour}</p>
            </div>
        );
    };

};


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
        let hourAMPM =  new Date().getHours() % 12 || 12;
        let hour =  new Date().getHours();
        let AMPM = hour>12 ? 'PM' : 'AM';
        let minute =  new Date().getMinutes().toString().length == 1 ?`0${new Date().getMinutes()}`:`${new Date().getMinutes()}`;
        let monthsName = ['January', 'February', 'March','April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let daysName = ['Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday', 'Sunday'];

        return (
            <div className="time">
                <Row>{hourAMPM}:{minute}&nbsp;{AMPM}</Row>
                <Row>{daysName[day]}, {dayNr}&nbsp;{monthsName[month]}</Row>
                <Row>Traffic: {hour}</Row>
            </div>
        );
    };

};


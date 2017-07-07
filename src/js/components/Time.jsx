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
        let monthsName = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outobro', 'Novembro', 'Dezembro'];
        let daysName = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

        return (
            <div className="time">
                <Row className="hours">{hourAMPM}:{minute}&nbsp;{AMPM}</Row>
                <Row className="date">{daysName[day - 1]}, {dayNr}&nbsp;{monthsName[month]}</Row>
                <Row className="traffic">
                        <img className="img" src={require("../../assets/images/icons/tasks/traffic.png")} />
                    <p>Trânsito </p>
                    <p className="deca">{hour}min até ao DeCA</p>
                </Row>
            </div>
        );
    };

};


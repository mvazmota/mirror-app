'use strict';

import React from 'react';
import {Row, Column, Icon, Button} from 'react-foundation';
import _ from 'lodash';

export default class Calendar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        let calendars = this.props.calendars;

        console.log(calendars);

        let img = <img src={require("../../assets/images/icons/tasks/tasks.png")} />;
        let calendarHTML = [];
        _.forEach(calendars, (calendar, index) => {
            // if (task.icon === "agenda") img = <img src={require("../../assets/images/icons/tasks/agend.png")} />;
            calendarHTML.push (
                <Row key={`calendar_${index}`} className="row_calendar">
                    <Column className="" small={7}>{calendar.title}</Column>
                    <Column className="" small={4}>{calendar.startTime} h</Column>
                </Row>);
        });

        return (
            <div className="calendar">
                <Row className="sectionTitle">
                    <img className="img" src={require("../../assets/images/icons/tasks/agend.png")} />
                    Agenda Familiar <span className="eva">EVA</span>
                </Row>
                <table className="table"><tr className="tr">{calendarHTML}</tr></table>
            </div>
        );
    };

};


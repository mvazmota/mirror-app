'use strict';

import React from 'react';
import {Row, Column, Icon, Button} from 'react-foundation';
import _ from 'lodash';

export default class Reminders extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {

        let tasks = this.props.tasks;
        let calendars = this.props.calendars;

        let img = <img src={require("../../assets/images/icons/tasks/tasks.png")} />;
        let taskHTML = [];
        _.forEach(tasks, (task, index) => {
            if (task.icon === "agenda") img = <img src={require("../../assets/images/icons/tasks/agend.png")} />;
            taskHTML.push (
            <Row key={`task_${index}`} className="display">
                <Column className="icon" small={1}>{img}</Column>
                <Column className="title" small={7}>{task.title}</Column>
                <Column className="time" small={4}>{task.startTime}</Column>
            </Row>);
        });

        return (
            <div className="reminders">
                <Row className="display-reminder">
                    Lembretes:
                </Row>
                {taskHTML}
            </div>
        );
    };

};


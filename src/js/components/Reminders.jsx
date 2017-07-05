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
        let taskHTML = [];
        _.forEach(tasks, (task, index) => {
            taskHTML.push (
            <Row key={`task_${index}`} className="display">
                <Column className="icon" small={1}><img src={require("../../assets/images/icons/tasks/tasks.png")} /></Column>
                <Column className="title" small={7}>{task.title}</Column>
                <Column className="time" small={4}>{task.startTime}</Column>
            </Row>);
        });

        return (
            <div className="reminders">
                <Row className="display-reminder">
                    Reminders:
                </Row>
                {taskHTML}
            </div>
        );
    };

};


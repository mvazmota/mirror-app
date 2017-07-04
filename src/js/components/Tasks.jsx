'use strict';

import React from 'react';
import {Row, Column, Icon, Button} from 'react-foundation';
import _ from 'lodash';

export default class Tasks extends React.Component {

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
                <Column small={8}>{task.title}</Column>
                <Column small={4}>{task.startTime}</Column>
            </Row>);
        });

        return (
            <div className="tasks">
                <Row className="display">
                    Reminders:
                </Row>
                {taskHTML}
            </div>
        );
    };

};


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
        _.forEach(tasks, function(task) {
            taskHTML.push (
            <Row className="display">
                <Column small={9}>{task.title}</Column>
                <Column small={3}>9:00 AM</Column>
            </Row>);
            console.log(task);
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


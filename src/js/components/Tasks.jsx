'use strict';

import React from 'react';
import {Row, Column, Icon, Button} from 'react-foundation';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Tasks extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        let tasks = this.props.tasks;

        let img = <img src={require("../../assets/images/icons/tasks/tasks.png")} />;
        let taskHTML = [];
        _.forEach(tasks, (task, index) => {
            // if (task.icon === "agenda") img = <img src={require("../../assets/images/icons/tasks/agend.png")} />;
            taskHTML.push (
                <Row key={`task_${index}`} className="">
                    {/*<Column className="icon" small={1}>{img}</Column>*/}
                    <Column className="" small={7}>{task.title}</Column>
                    <Column className="" small={4}>{task.startTime}</Column>
                </Row>);
        });

        return (
            <div className="tasks">
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="fade"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                    transitionAppear={true}
                    transitionAppearTimeout={1000}
                >
                <Row className="sectionTitle">
                    EVA Tasks
                </Row>
                {taskHTML}
                </ReactCSSTransitionGroup>
            </div>
        );
    };

};


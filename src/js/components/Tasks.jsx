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

        let img = <img src={require("../../assets/images/icons/tasks/tasks.png")} />;
        let taskHTML = [];
        _.forEach(tasks, (task, index) => {
            // if (task.icon === "agenda") img = <img src={require("../../assets/images/icons/tasks/agend.png")} />;
            taskHTML.push (
                <Row key={`task_${index}`} className="row_tasks">
                    {/*<Column className="icon" small={1}>{img}</Column>*/}
                    <Column className="" small={7}>{task.title}</Column>
                    <Column className="" small={4}>{task.startTime}</Column>
                </Row>);
        });

        return (
            <div className="tasks">
                <Row className="sectionTitle">
                    <img className="img" src={require("../../assets/images/icons/tasks/tasks.png")} />
                    EVA Tasks <span className="eva">EVA</span>
                </Row>
                <table className="table"><tr className="tr">{taskHTML}</tr></table>
            </div>
        );
    };

};


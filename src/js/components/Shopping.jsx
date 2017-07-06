'use strict';

import React from 'react';
import {Row, Column, Icon, Button} from 'react-foundation';
import _ from 'lodash';

export default class Shopping extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentWillMount(){
        console.log(this.props.lists)
    }

    render() {

        let lists = this.props.lists;

        // let img = <img src={require("../../assets/images/icons/tasks/tasks.png")} />;
        let shoppingHTML = [];

        _.forEach(lists, (list, index) => {
            shoppingHTML.push (
                <Row key={`list_${index}`} className="display">
                    {/*<Column className="icon" small={1}>{img}</Column>*/}
                    <Column className="title" small={7}>{list.name}</Column>
                </Row>);
        });

        return (
            <div className="shopping">
                <Row className="display-shopping">
                    Listas Compras:
                </Row>

                {shoppingHTML}
            </div>
        );
    };

};


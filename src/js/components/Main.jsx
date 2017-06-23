'use strict';

import React from 'react';
import {Row, Column, Icon, Button} from 'react-foundation';
import _ from 'lodash';
import Music from './Music';
import MusicSmall from './MusicSmall';
import Shopping from './Shopping';
import Tasks from './Tasks';
import Greeting from './Greeting';
import Time from './Time';
import Weather from './Weather';

export default class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            welcome: true,
        };
    }

    componentWillMount(){
        this.props.actionCreators.getUser();
        setTimeout(function(){
            this.setState({welcome:false});
        }.bind(this), 10000);
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.actionData.users.items)
    }

    render() {
        let welcome = (this.state.welcome&&<Greeting/>);

        return (
            <div id="root" className="main">
                <Row>
                    <Column>
                        <Time />
                    </Column>
                    <Column>
                        <Weather />
                    </Column>
                </Row>

                <section className="center">
                    {welcome}
                </section>

                <Row>
                    <Column>
                        <Time />
                    </Column>
                    <Column>
                    </Column>
                </Row>

                <section className="center">
                    <div className="music-small center-bottom">
                        <MusicSmall />
                    </div>
                </section>
            </div>
        );
    };

};


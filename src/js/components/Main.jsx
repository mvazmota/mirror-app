'use strict';

import React from 'react';
import {Row, Column, Icon, Button} from 'react-foundation';
import _ from 'lodash';
import Music from './Music';
import MusicSmall from './MusicSmall';
import Shopping from './Shopping';
import Tasks from './Tasks';
import Calendar from './Calendar';
import Reminders from './Reminders';
import Greeting from './Greeting';
import Tv from './Tv';
import Time from './Time';
import Weather from './Weather';

export default class Main extends React.Component {

    constructor(props) {
        super(props);

        this._handleKey = this._handleKey.bind(this);

        this.state = {
            welcome: true,
            tv: false,
            shopping: false,
            tasks: false,
            calendar: false,
        };
    }

    componentWillMount(){
        this.props.actionCreators.getUser();
        this.props.actionCreators.getList();
        this.props.actionCreators.getTask();
        this.props.actionCreators.weather();

        // Remove Greeting after 10sec
        setTimeout(function(){
            this.setState({
                welcome:false,
            });
        }.bind(this), 10000);
    }

    componentWillReceiveProps(nextProps){
        // console.log(nextProps.actionData.users.items[0]);
        // console.log(nextProps.actionData.lists.items);
        // console.log(nextProps.actionData.tasks.items);
        // console.log(nextProps.actionData.weather.items);
    }

    componentWillMount(){
        document.addEventListener('keydown', this._handleKey);
    }

    render() {
        let welcome = (this.state.welcome&&<Greeting user={this.props.actionData.users.items[0]}/>);
        let tv = (this.state.tv&&<Tv/>);
        let shopping = (this.state.shopping&&<Shopping/>);
        let tasks = (this.state.tasks&&<Tasks/>);
        let calendar = (this.state.calendar&&<Calendar/>);

        window.onload = function() {
            document.getElementsByTagName('body')[0].onkeydown = function(e) {
                let ev = e || event;
                console.log(ev);
            }
        };

        return (
            <div id="root" className="main">
                <Row>
                    <Column>
                        <Time />
                    </Column>
                    <Column>
                        <Weather weather={this.props.actionData.weather.items} />
                    </Column>
                </Row>

                <section className="center">
                    <div className="content">
                        {welcome}
                        {tv}
                        {tasks}
                        {shopping}
                        {calendar}
                    </div>
                </section>

                <Row>
                    <Column>
                        <Reminders tasks={this.props.actionData.tasks.items} />
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

    componentWillUnmount() {
        document.removeEventListener('keydown', this._handleKey);
    };

    _handleKey(event) {
        // // TECLA A
        // if(event.keyCode==65){
        //     this.setState({
        //         welcome:true,
        //         tv:false
        //     });
        // // TECLA D
        // } else if(event.keyCode==68){
        //     this.setState({
        //         welcome:false,
        //         tv:true
        //     });
            // TECLA V - SHOPPING
        if(event.keyCode==86){
            this.setState({
                shopping: true,
                tasks: false,
                tv: false,
                calendar: false
            });
            // TECLA B - TASKS
        } else if(event.keyCode==66){
            this.setState({
                shopping: false,
                tasks: true,
                tv: false,
                calendar: false
            });
            // TECLA N - CALENDAR
        } else if(event.keyCode==78){
            this.setState({
                shopping: false,
                tasks: false,
                tv: false,
                calendar: true
            });
            // TECLA M - TV
        } else if(event.keyCode==77){
            this.setState({
                shopping: false,
                tasks: false,
                tv: true,
                calendar: false
            });
        }
    }
};


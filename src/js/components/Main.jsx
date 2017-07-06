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
        this.props.actionCreators.getCalendar();

        document.addEventListener('keydown', this._handleKey);
        // Remove Greeting after 10sec
        setTimeout(function(){
            this.setState({
                welcome:false,
            });
        }.bind(this), 10000);
    }

    componentWillReceiveProps(nextProps){
        // console.log(nextProps.actionData.users.items[0]);
        console.log(nextProps.actionData.lists.items);
        // console.log(nextProps.actionData.tasks.items);
        // console.log(nextProps.actionData.weather.items);
        // console.log(nextProps.actionData.calendars.items);
    }

    render() {
        let welcome = (this.state.welcome&&<Greeting user={this.props.actionData.users.items[0]}/>);
        let tv = (this.state.tv&&<Tv/>);
        let shopping = (this.state.shopping&&<Shopping lists={this.props.actionData.lists.items} />);
        let tasks = (this.state.tasks&&<Tasks tasks={this.props.actionData.tasks.items} />);
        let calendar = (this.state.calendar&&<Calendar calendars={this.props.actionData.calendars.items} />);

        return (
            <div id="root" className="main">
                <Row className="topRow">
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
                        <Reminders tasks={this.props.actionData.tasks.items}
                                   calendars={this.props.actionData.calendars.items}
                        />
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
            // TECLA W - SHOPPING
        if(event.keyCode==87){
            if(this.state.shopping == false){
                this.setState({
                    shopping: true,
                    tasks: false,
                    tv: false,
                    calendar: false,
                    welcome:false,
                });
            } else {
                this.setState({
                    shopping: false,
                });
            }
            // TECLA A - TASKS
        } else if(event.keyCode==65){
            if(this.state.tasks == false){
                this.setState({
                    shopping: false,
                    tasks: true,
                    tv: false,
                    welcome:false,
                    calendar: false
                });
            } else {
                this.setState({
                    tasks: false,
                });
            }
            // TECLA S - CALENDAR
        } else if(event.keyCode==83){
            if(this.state.calendar == false){
                this.setState({
                    shopping: false,
                    tasks: false,
                    tv: false,
                    welcome:false,
                    calendar: true
                });
            } else {
                this.setState({
                    calendar: false,
                });
            }
            // TECLA D - TV
        } else if(event.keyCode==68){
            if(this.state.tv == false){
                this.setState({
                    shopping: false,
                    tasks: false,
                    tv: true,
                    welcome:false,
                    calendar: false
                });
            } else {
                this.setState({
                    tv: false,
                });
            }
        }
    }
};


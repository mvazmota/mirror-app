'use strict';

import React from 'react';
import Player from './player/Player';
import {Row, Column, Icon, Button} from 'react-foundation';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Tv extends React.Component {

    constructor(props) {
        super(props);

        this._handleKey = this._handleKey.bind(this);

        this.channels = [
            "http://iptv.atnog.org/hls/rtp1.m3u8",
            "http://iptv.atnog.org/hls/rtp2.m3u8",
            "http://iptv.atnog.org/hls/sic.m3u8",
            "http://iptv.atnog.org/hls/tvi.m3u8",
            "http://iptv.atnog.org/hls/rtp3.m3u8",
            "http://iptv.atnog.org/hls/rtpmem.m3u8",
            "http://iptv.atnog.org/hls/artv.m3u8",
        ];

        this.state = {
            channel:this.channels[0]
        };
    }

    componentWillMount(){
        document.addEventListener('keydown', this._handleKey);
    }

    render() {
        return (
            <div className="tv">
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="background"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                    transitionAppear={true}
                    transitionAppearTimeout={1000}
                >
                <Player source={this.state.channel}
                        autoPlay={true}
                />
                </ReactCSSTransitionGroup>
            </div>
        );
    };

    componentWillUnmount() {
        document.removeEventListener('keydown', this._handleKey);
    };

    _handleKey(event) {
        if(event.keyCode==49){
            this.setState({channel:this.channels[0]})
        } else if (event.keyCode==50){
            this.setState({channel:this.channels[1]})
        } else if (event.keyCode==51){
            this.setState({channel:this.channels[2]})
        } else if (event.keyCode==52){
            this.setState({channel:this.channels[3]})
        } else if (event.keyCode==53){
            this.setState({channel:this.channels[4]})
        } else if (event.keyCode==54){
            this.setState({channel:this.channels[5]})
        } else if (event.keyCode==55){
            this.setState({channel:this.channels[6]})
        }
    }
};


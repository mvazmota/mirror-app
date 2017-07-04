'use strict';

import React from 'react';
import Player from './player/Player';
import {Row, Column, Icon, Button} from 'react-foundation';
import _ from 'lodash';

export default class Tv extends React.Component {

    constructor(props) {
        super(props);

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
    }

    render() {
        return (
            <div className="tv">
                <Player source={this.state.channel}
                        autoPlay={true}
                />
            </div>
        );
    };

};


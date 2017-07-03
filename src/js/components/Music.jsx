'use strict';

import React from 'react';
import CLAudioPlayer from 'react-cl-audio-player';

import {Row, Column, Icon, Button} from 'react-foundation';
import _ from 'lodash';

export default class Music extends React.Component {

    constructor(props) {
        super(props);

        this.songs = [
            {
                url: '../../assets/music/Bradio/Flyers.mp3',
                cover: '../../assets/music/Bradio/home_bg.jpg',
                artist: {
                    name: 'Bradio',
                    song: 'Flyers'
                }
            },
            {
                url: '../../assets/music/Slayer/RainingBlood.mp3',
                cover: '../../assets/music/Slayer/maxresdefault.jpg',
                artist: {
                    name: 'Slayer',
                    song: 'Raining Blood'
                }
            }
        ];

        this.state = {
        };
    }

    componentWillMount(){
    }

    render() {
        return (
            <div className="music">
                <CLAudioPlayer songs={this.songs} autoplay />
            </div>
        );
    };

};


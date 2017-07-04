'use strict';

import React from 'react';
import CLAudioPlayer from 'react-cl-audio-player';

import {Row, Column, Icon, Button} from 'react-foundation';
import _ from 'lodash';

export default class MusicSmall extends React.Component {

    constructor(props) {
        super(props);

        this._handleKey = this._handleKey.bind(this);
        this.songs = [
            {
                url: '../src/assets/music/Bradio/Flyers.mp3',
                cover: '../src/assets/music/Bradio/home_bg.jpg',
                artist: {
                    name: 'Bradio | ',
                    song: 'Flyers'
                }
            },
            {
                url: '../src/assets/music/Slayer/RainingBlood.mp3',
                cover: '../src/assets/music/Slayer/maxresdefault.jpg',
                artist: {
                    name: 'Slayer | ',
                    song: 'Raining Blood'
                }
            }
        ];

        this.state = {
        };
    }

    componentWillMount(){
        document.addEventListener('keydown', this._handleKey);
    }

    render() {
        return (
            <div className="music-small">
                <CLAudioPlayer ref="music" songs={this.songs} autoplay />
            </div>
        );
    };

    componentWillUnmount() {
        document.removeEventListener('keydown', this._handleKey);
    };

    _handleKey(event) {

        if(event.keyCode==39){
            this.refs.music.next()
        } else if (event.keyCode==37){
            this.refs.music.previous()
        } else if (event.keyCode==38){
            if (this.refs.music.audio.volume != 1){
                this.refs.music.audio.volume += 0.2;
            }
        } else if (event.keyCode==40){
            if (this.refs.music.audio.volume > 0.2){
                this.refs.music.audio.volume -= 0.2;
            }
        }
    }
};


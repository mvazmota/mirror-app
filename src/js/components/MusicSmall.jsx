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
                url: 'http://cdn.tv4e.pt/eva/music/Bradio/Flyers.mp3',
                cover: 'http://cdn.tv4e.pt/eva/music/Bradio/home_bg.jpg',
                artist: {
                    name: 'Bradio | ',
                    song: 'Flyers'
                }
            },
            {
                url: 'http://cdn.tv4e.pt/eva/music/Slayer/RainingBlood.mp3',
                cover: 'http://cdn.tv4e.pt/eva/music/Slayer/maxresdefault.jpg',
                artist: {
                    name: 'Slayer | ',
                    song: 'Raining Blood'
                }
            }
        ];

        this.state = {
            music: false,
        };
    }

    componentWillMount(){
        document.addEventListener('keydown', this._handleKey);
    }

    render() {
        return (
            <div className="music-small">
                <CLAudioPlayer ref="music" songs={this.songs} />
            </div>
        );
    };

    componentWillUnmount() {
        document.removeEventListener('keydown', this._handleKey);
    };

    _handleKey(event) {
        // TECLA Q
        if(event.keyCode==69){
            this.refs.music.next()
            // TECLA E
        } else if (event.keyCode==81){
            this.refs.music.previous()
        } else if (event.keyCode==70){
            if(this.state.music == false){
                this.refs.music.play();
                this.setState({
                    music:true,
                });
            } else {
                this.refs.music.pause();
                this.setState({
                    music:false,
                });
            }
        } else if (event.keyCode==82){
            if (this.refs.music.audio.volume != 1){
                this.refs.music.audio.volume += 0.2;
            }
        } else if (event.keyCode==70){
            if (this.refs.music.audio.volume > 0.2){
                this.refs.music.audio.volume -= 0.2;
            }
        }
    }
};


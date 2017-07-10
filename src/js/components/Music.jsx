'use strict';

import React from 'react';

import {Row, Column, Icon, Button} from 'react-foundation';
import _ from 'lodash';

const pizzi = require('pizzicato');
export default class Music extends React.Component {

    constructor(props) {
        super(props);

        this._handleKey = this._handleKey.bind(this);

        this.state = {
            fileLoaded : false
        };
    }

    componentWillMount(){
        document.addEventListener('keydown', this._handleKey);
    }

    componentDidMount(){
        this.foo = new pizzi.Sound('http://cdn.tv4e.pt/eva/sequence1.mp3', function() {

            let distortion = new pizzi.Effects.Distortion({
                gain: 0
            });

            let reverb = new pizzi.Effects.Reverb({
                time: 0.0001,
                decay: 0.8,
                reverse: true,
                mix: 0.5
            });

            let tremolo = new pizzi.Effects.Tremolo({
                speed: 0,
                depth: 1,
                mix: 0.5
            });

            let delay = new pizzi.Effects.Delay({
                feedback: 0.1,
                time: 0,
                mix: 0.5
            });

            let lowPassFilter = new pizzi.Effects.LowPassFilter({
                frequency: 22050,
                peak: 10
            });

            let ringModulator = new pizzi.Effects.RingModulator({
                speed: 0,
                distortion: 1,
                mix: 0.5
            });

            this.foo.addEffect(distortion);
            this.foo.addEffect(reverb);
            this.foo.addEffect(tremolo);
            this.foo.addEffect(delay);
            this.foo.addEffect(lowPassFilter);
            this.foo.addEffect(ringModulator);

            this.foo.loop=true;

            this.foo.play();
            this.setState({fileLoaded:true});
        }.bind(this));
    }

    render() {

       if(this.state.fileLoaded){
           console.log(this.foo);
       }

        return (
            <div className="music">
                {/*<p>Hello World</p>*/}
            </div>
        );
    };

    componentWillUnmount() {
        document.removeEventListener('keydown', this._handleKey);
    };

    _handleKey(event) {
        // Tecla T
        if(event.keyCode==84){
            this.foo.effects[0].gain += 0.1;
            console.log('distortion: ' + this.foo.effects[0].gain);
        }
        // Tecla G
        else if(event.keyCode==71){
            this.foo.effects[0].gain -= 0.1;
            console.log('distortion: ' + this.foo.effects[0].gain);
        }


        // Tecla Y
        else if(event.keyCode==89){
            this.foo.effects[1].time += 0.1;
            console.log('reverb: ' + this.foo.effects[1].time);
        }
        // Tecla H
        else if(event.keyCode==72){
            this.foo.effects[1].time -= 0.1;
            console.log('reverb: ' + this.foo.effects[1].time);
        }


        // Tecla U
        else if(event.keyCode==85){
            this.foo.effects[2].speed += 0.1;
            console.log('tremolo: ' + this.foo.effects[2].speed);
        }
        // Tecla J
        else if(event.keyCode==74){
            this.foo.effects[2].speed -= 0.1;
            console.log('tremolo: ' + this.foo.effects[2].speed);
        }


        // Tecla I
        else if(event.keyCode==73){
            this.foo.volume += 0.1;
            console.log('volume: ' + this.foo.volume);
        }
        // Tecla K
        else if(event.keyCode==75){
            this.foo.volume -= 0.1;
            console.log('volume: ' + this.foo.volume);
        }

        // Tecla O
        else if(event.keyCode==79){
            this.foo.effects[4].frequency += 1000;
            console.log('lowPass: ' + this.foo.effects[4].frequency);
        }
        // Tecla L
        else if(event.keyCode==76){
            this.foo.effects[4].frequency -= 1000;
            console.log('lowPass: ' + this.foo.effects[4].frequency);
        }

        // Tecla 0-zero
        else if(event.keyCode==48){
            this.foo.effects[5].speed += 100;
            console.log('ringModulator: ' + this.foo.effects[5].speed);
        }
        // Tecla P
        else if(event.keyCode==80){
            this.foo.effects[5].speed -= 100;
            console.log('ringModulator: ' + this.foo.effects[5].speed);
        }

        // Tecla M
        else if(event.keyCode==77){
            if(this.foo.playing == true){
                this.foo.pause();
                console.log('paused');
            } else {
                this.foo.play();
                console.log('play');
            }
        }
    }

};


'use strict';

import React from 'react';
import Clappr from 'clappr';

export default React.createClass({

    propTypes: {
        source: React.PropTypes.string,
        watermark: React.PropTypes.string,
        watermarkPosition: React.PropTypes.string,
        autoPlay: React.PropTypes.bool,
        worker: React.PropTypes.bool,
        width: React.PropTypes.string,
        height: React.PropTypes.string,
        controls: React.PropTypes.bool,
        pause: React.PropTypes.bool,
        onTimeUpdate: React.PropTypes.func,
        onEnded: React.PropTypes.func
    },

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.pause == false) {
            this.player.play();
        }else{
            this.player.pause();
        }

        let changed = (nextProps.source != this.props.source);
        this.props = nextProps;
        this.state = nextState;

        if (changed) {
            this.change(nextProps);
        }
        return false;
    },

    componentDidMount() {
        this.change(this.props);
    },

    componentWillUnmount() {
        this.destroyPlayer();
    },

    destroyPlayer() {
        if (this.player) {
            this.player.destroy();
        }
        this.player = null;
    },

    change(props) {
        if (this.player) {
            this.destroyPlayer();
        }

        this.player = new Clappr.Player({
            parent: this.refs.player,
            source: props.source,
            autoPlay: props.autoPlay,
            width: props.width,
            height: props.height,
            hlsjsConfig: {
                enableWorker: props.worker
            },
            watermark: props.watermark, position: props.watermarkPosition,
            exitFullscreenOnEnd: false,
            loop: false
        });

        if(props.onTimeUpdate){
            this.player.on(Clappr.Events.PLAYER_TIMEUPDATE, props.onTimeUpdate);
        }

        if(props.onEnded){
            this.player.on(Clappr.Events.PLAYER_ENDED, props.onEnded);
        }

        if (!props.controls) {
            this.player.on(Clappr.Events.PLAYER_PLAY, function () {
                this.player.core.mediaControl.disable();
                const k = this.player.core.mediaControl.kibo;
                // Unbind previous left and right keys
                k.off(['left', 'right', '0', '1', '2', '3', '4', '5',
                    '6', '7', '8', '9', 'up', 'down']);
            }.bind(this));
        }
    },

    render() {
        return (
            <div ref="player"></div>
        );
    }

});


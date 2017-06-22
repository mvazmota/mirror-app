'use strict';

import React from 'react';
import ClapprPlayer from './ClapprPlayer';

export default class Player extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.props = nextProps;
        return true;
    }

    render() {
        return (
            <ClapprPlayer width="100%" height="100%"
                          autoPlay={this.props.autoPlay}
                          controls={this.props.controls}
                          pause={this.props.pause}
                          source={this.props.source}
                          onTimeUpdate={this.props.onTimeUpdate}
                          onEnded={this.props.onEnded}
            />
        );
    };


};

Player.propTypes = {
    source: React.PropTypes.string,
    autoPlay: React.PropTypes.bool,
    controls: React.PropTypes.bool,
    pause: React.PropTypes.bool,
    onTimeUpdate: React.PropTypes.func,
    onEnded: React.PropTypes.func
};

Player.defaultProps = {
    autoPlay: false,
    controls: false,
    pause: false,
    onTimeUpdate: null,
    onEnded: null
};


'use strict';

import React from 'react';

import {Row, Column, Icon, Button} from 'react-foundation';
import Animation from '../tools/Animation';

import Channel from './styles/Channel';
import InformativeVideo from './styles/InformativeVideo';

export default class Notification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            componentRendered: false,
            smallNot: false,
        };

        this.timer = "";
    };

    componentWillMount() {
        document.addEventListener('keydown', this._handleKey.bind(this), false);
    };

    componentWillUnmount() {
        clearTimeout(this.state.timer);
        document.removeEventListener('keydown',this._handleKey.bind(this));
    };

    render() {
        console.log(this.props.thumbnail);

        let style = this._setStyle();
        return (
            <Animation animation={{
                            load: [
                                {
                                    initialStyle: {opacity: "0"},
                                    style: {opacity: "1"},
                                    animation: ["fadeIn"],
                                    priority: 1
                                }
                            ],
                            event: [
                                {
                                    style: {width: "25rem"},
                                    animation: ["resizeAnim"],
                                    priority: 1
                                }
                            ]
                        }}
                        childId="notification"
                        ref="animator">
                <div id="notification" className="notification" ref="notification">
                    <section className="notification__content">
                        {style}
                    </section>
                </div>
            </Animation>
        );
    };

    componentDidMount(){
        this.timer = setTimeout(this._hideNotification.bind(this), 30000);
    }

    _setStyle(){
        let content;

        if (this.props.type == "channel"){
            content =
                <Channel
                    thumbnail={this.props.thumbnail}
                    channel={this.props.channel}
                 />;
        }else if (this.props.type == "advertisement"){
            content =
                <InformativeVideo
                    description= {this.props.description}
                    asgieImage= {this.props.asgieImage}
                    smallNot= {this.state.smallNot}
                />;
        }

        return content;
    }

    _showNotification(){
        this.props.onOpen();
    };

    _goSmallNotification(){

    };

    _hideNotification(){
        if (this.props.type !== "channel"){
            this.refs.animator._animate();
            this.setState({smallNot:true});
           setTimeout(()=>{this.props.onClose();}, (60000 *3));
        }else{
            this.props.onClose();
        }
    };

    _handleKey(event) {
        if(this.state.componentRendered){
            if (event.keyCode === 13) {
                this._hideNotification.bind(this);
            }
        }
    };
};
Notification.propTypes = {
    type: React.PropTypes.string,
    title: React.PropTypes.string,
    description: React.PropTypes.string,
    onClose: React.PropTypes.func,
    onOpen: React.PropTypes.func,
    thumbnail: React.PropTypes.string,
    asgieImage: React.PropTypes.string,
    channel: React.PropTypes.number
};

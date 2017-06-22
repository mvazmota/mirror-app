'use strict';

import React from 'react';
import Player from './player/Player';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Notification from './Notification/Notification';
import OverlayScreen from './../containers/OverlayScreen';
import _ from 'lodash';
import Screenfull from 'screenfull';

import {browserHistory} from 'react-router';

export default class Iptv extends React.Component {
    constructor(props) {
        super(props);
        this._handleKey = this._handleKey.bind(this);

        this.state = {
            channel: this.props.channels[0],
            advertisement: false,
            // adQueue: [],
            adVideo: null,
            notification: false,
            notificationThumb: '../../assets/images/icons/ch_1.png',
            notificationType: 'channel',
            notificationChannel: 1,
            pauseAd: false,
            pauseTv: true,
            overlaySplash: true,
            seeAd:false,
            overlay: 'splash'
        };

        if (props.actionData.bootState.state) {
            this.state.channel =  this.props.channels[props.actionData.channelState.items];
            this.state.pauseTv = false;
            this.state.overlaySplash = false;
        } else {
            this.props.actionCreators.setChannel(0);
            props.actionCreators.setBoot(true);
        }

        this.adTime= 0;

        // if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))){
        //     this.state.pauseTv = false;
        //     this.state.overlaySplash = false;
        // }
    }

    componentWillMount() {
        document.addEventListener('keydown', this._handleKey);
    };

    componentWillReceiveProps(nextProps){

        if (!_.isEmpty(nextProps.actionData.socket.SendVideos) && (!_.isEqual(this.props.actionData.socket.SendVideos, nextProps.actionData.socket.SendVideos))){
            this.props.actionCreators.log({event:`RECEIVED_VIDEO`, informative_video_id:nextProps.actionData.socket.SendVideos.informative_video_id});
            // this.state.adQueue.push(this.props.actionData.socket.SendVideos);
            if(!this.state.advertisement){
                this.state.notification= true;
                this.state.notificationType= 'advertisement';
                this.state.adVideo = nextProps.actionData.socket.SendVideos;
            }
        }

        if (!_.isEmpty(nextProps.actionData.socket.SendHdmiState) && (!_.isEqual(this.props.actionData.socket.SendHdmiState, nextProps.actionData.socket.SendHdmiState))){
        // if (!_.isEmpty(nextProps.actionData.socket.SendHdmiState)){
            if(nextProps.actionData.socket.SendHdmiState.on_state==1){
                this.state.overlay= 'info';
                this.state.overlaySplash = true;

                this.state.pauseTv = true;
                setTimeout(function(){
                    this.setState({overlaySplash:false, pauseTv:false});
                }.bind(this), 10000);
            }
        }

        this.props = nextProps;
    };

    render() {
        let splash = (this.state.overlaySplash?<OverlayScreen screen={this.state.overlay}/>:null);
        let adVideo = this.state.adVideo;

        let notTitle = `${!_.isEmpty(adVideo)?adVideo.title:'Milhares de visitante no Luso para assistirem a eventos desportivos'}`;
        let notImage = !_.isEmpty(adVideo)?require(`../../assets/images/asgies/resized3/${adVideo.image}`):'https://i.imgur.com/WRHb6LF.png';
        let ad = !_.isEmpty(adVideo)?adVideo.url:'http://cdn.tv4e.pt/videos/37632925-d460-4a7b-bf35-4ab009fe69a3.mp4';

        let notification = (
            this.state.notification == true && !this.state.overlaySplash &&
                <Notification
                    onClose={this._closeNot.bind(this)}
                    description={notTitle}
                    asgieImage={notImage}
                    thumbnail={this.state.notificationThumb}
                    channel={this.state.notificationChannel}
                    type={this.state.notificationType}
                />
        );

        let advertisement = (this.state.advertisement &&
                <ReactCSSTransitionGroup
                    transitionName="advertisement_in"
                    transitionAppear={true} transitionAppearTimeout={2000}
                    transitionEnter={false} transitionLeave={false}
                >
                    <Player
                        source={ad}
                        pause={this.state.pauseAd}
                        autoPlay={true}
                        onTimeUpdate={this._onTimeUpdate.bind(this)}
                    />
                </ReactCSSTransitionGroup>
        );

        return (

            <div className="mainLayout-wrapper">
                {splash}
                <section className="iptv">
                    {notification}
                    <div className="iptv__player">
                        {!this.state.overlaySplash&&
                        <Player source={this.state.channel}
                                autoPlay={true}
                                pause={this.state.pauseTv}/>
                        }

                        <div className="iptv__player-overlay">
                            {advertisement}
                        </div>
                    </div>
                </section>
            </div>
        );

    };

    componentWillUnmount() {
        document.removeEventListener('keydown', this._handleKey);
    };

    _openAdvertisement() {
        this.setState(
            {
                pauseTv: true,
                notification: false,
                advertisement: true,
            }
        );
    }

    _closeNot() {
        this.props.actionCreators.advertisement({seen:0, rejected:1, informative_video_id:this.props.actionData.socket.SendVideos.informative_video_id});
        this.setState({notification: false});
    }

    _closeAdvertisement() {
        let seen = parseInt((100 * this.adTime.current) / this.adTime.total);

        this.props.actionCreators.advertisement({seen, rejected:0, informative_video_id:this.props.actionData.socket.SendVideos.informative_video_id});
        this.props.actionCreators.log({event:"CANCELED VIDEO", informative_video_id:this.props.actionData.socket.SendVideos.informative_video_id});

        // this.state.adQueue.shift();
        // let notification = !_.isEmpty(this.state.adQueue)?true:null;

        this.setState({
            pauseTv: false,
            advertisement: false,
            adVideo:null
            // notification,
            // adQueue: this.state.adQueue
        });
    }

    _endedAdvertisement() {
        let seen = (100 * this.adTime.current) / this.adTime.total;
        this.props.actionCreators.advertisement({seen:seen, informative_video_id:this.props.actionData.socket.SendVideos.informative_video_id});
        this.props.actionCreators.log({event:"SEEN VIDEO", informative_video_id:this.props.actionData.socket.SendVideos.informative_video_id});

        // this.state.adQueue.shift();
        // let notification = !_.isEmpty(this.state.adQueue)?true:null;

        this.setState({
            pauseAd:true,
            advertisement: false,
            // notification,
            // adQueue: this.state.adQueue
        }, () =>{
            this.setState({
                pauseTv: false,
                adVideo:null
                // notification,
                // adQueue: this.state.adQueue
            });
        });
    }

    _onTimeUpdate(e){
        this.adTime = e;
        if(parseInt(e.current) == parseInt(e.total)){
            this._endedAdvertisement();
        }
    }

    _handleKey(event) {
        if (!this.state.advertisement) {
            if (this.state.overlaySplash) {
                if (Screenfull.enabled) {
                    this.setState({overlay:'info', overlaySplash:true, pauseTv:true}, ()=>{
                        setTimeout(function(){
                            this.setState({overlaySplash:false, pauseTv:false});
                        }.bind(this), 10000);
                    });

                    Screenfull.request();
                }
            } else {
                if (event.keyCode === 38) {
                    let i = _.indexOf(this.props.channels, this.state.channel) + 1;

                    if (i == _.lastIndexOf(this.props.channels)) {
                        i = 1;
                    } else {
                        i = i + 1;
                    }

                    this.props.actionCreators.setChannel(i - 1);
                    this.props.actionCreators.log({event:`CHANGED CHANNEL KEYUP 38: ${i}`});
                    this.setState({pauseTv:false, channel: this.props.channels[i - 1]}, function () {
                        // this.setChannelNotification(i);
                    });

                } else if (event.keyCode === 40) {
                    let i = _.indexOf(this.props.channels, this.state.channel) + 1;

                    if (i == 1) {
                        i = _.lastIndexOf(this.props.channels);
                    } else {
                        i = i - 1;
                    }
                    this.props.actionCreators.setChannel(i -1);
                    this.props.actionCreators.log({event:`CHANGED CHANNEL KEYDOWN 40: ${i}`});
                    this.setState({pauseTv:false, channel: this.props.channels[i - 1]}, function () {
                    });

                } else if (event.keyCode === 13) {
                    if (this.state.notification == true && this.state.notificationType !== "channel") {
                        this._openAdvertisement();
                    }

                } else if (event.keyCode === 48) {
                    this.props.actionCreators.log({event:`OPENED LIBRARY KEY 48`});
                    browserHistory.push('/library');
                } else if (event.keyCode === 49) {
                    this.props.actionCreators.setChannel(0);
                    this.props.actionCreators.log({event:`CHANGED CHANNEL KEYUP 49: ${1}`});
                    this.setState({pauseTv:false, channel: this.props.channels[0]});
                } else if (event.keyCode === 50) {
                    this.props.actionCreators.setChannel(1);
                    this.props.actionCreators.log({event:`CHANGED CHANNEL KEYUP 50: ${2}`});
                    this.setState({pauseTv:false, channel: this.props.channels[1]});
                } else if (event.keyCode === 51) {
                    this.props.actionCreators.setChannel(2);
                    this.props.actionCreators.log({event:`CHANGED CHANNEL KEYUP 51: ${3}`});
                    this.setState({pauseTv:false, channel: this.props.channels[2]});
                } else if (event.keyCode === 52) {
                    this.props.actionCreators.setChannel(3);
                    this.props.actionCreators.log({event:`CHANGED CHANNEL KEYUP 52: ${4}`});
                    this.setState({pauseTv:false, channel: this.props.channels[3]});
                } else if (event.keyCode === 53) {
                    this.props.actionCreators.setChannel(4);
                    this.props.actionCreators.log({event:`CHANGED CHANNEL KEYUP 53: ${5}`});
                    this.setState({pauseTv:false, channel: this.props.channels[4]});
                } else if (event.keyCode === 54) {
                    this.props.actionCreators.setChannel(5);
                    this.props.actionCreators.log({event:`CHANGED CHANNEL KEYUP 54: ${6}`});
                    this.setState({pauseTv:false, channel: this.props.channels[5]});
                } else if (event.keyCode === 55) {
                    this.props.actionCreators.setChannel(6);
                    this.props.actionCreators.log({event:`CHANGED CHANNEL KEYUP 55: ${7}`});
                    this.setState({pauseTv:false, channel: this.props.channels[6]});
                }
            }
        } else{
            if (event.keyCode === 13) {
                this._closeAdvertisement();
            }
        }
    };

    setChannelNotification(i){
        let src = `./src/assets/images/icons/ch_${i}.png`;
        let thumb = <img src={src}/>;

        this.setState({
            notification: true,
            notificationThumb: thumb,
            notificationType: "channel",
            notificationChannel: i
        });
    }

};

Iptv.propTypes = {channels: React.PropTypes.array};

Iptv.defaultProps = {
    channels: [
        "http://iptv.atnog.org/hls/rtp1.m3u8",
        "http://iptv.atnog.org/hls/rtp2.m3u8",
        "http://iptv.atnog.org/hls/sic.m3u8",
        "http://iptv.atnog.org/hls/tvi.m3u8",
        "http://iptv.atnog.org/hls/rtp3.m3u8",
        "http://iptv.atnog.org/hls/rtpmem.m3u8",
        "http://iptv.atnog.org/hls/artv.m3u8",
    ]
};


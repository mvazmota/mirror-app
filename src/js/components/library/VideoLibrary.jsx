import React from 'react';
import Header from './modules/Header';
import VideoList from './modules/VideoList';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Player from '../player/Player';
import _ from 'lodash';
import Screenfull from 'screenfull';

import Auth from '../../auth';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

export default class VideoLibrary extends React.Component {

    constructor(props) {
        super(props);
        this._handleKey = this._handleKey.bind(this);

        this.state = {
            seen: false,
            unseen: true,
            videoSelected: {
                title: '',
                image: '',
                duration: '',
                url: '',
                id: ''
            },
            advertisement: false,
            pauseAd: false,
        };

        this.adTime= 0;
    }

    componentWillMount() {
        this.props.actionCreators.videos();
        console.log(this.props);
        document.addEventListener('keydown', this._handleKey);
    };

    componentWillReceiveProps(nextProps) {
       this.props = nextProps;

        if(_.isEmpty(this.props.actionData.videos.items.videosUnseen) && !_.isEmpty(this.props.actionData.videos.items.videosSeen)){
            this.state.seen = true;
            this.state.unseen = false;
        }
    };

    render() {

        let advertisement = (this.state.advertisement ?
                <div className="iptv__player">
                    <div className="iptv__player-overlay">
                        <ReactCSSTransitionGroup
                            transitionName="advertisement_in"
                            transitionAppear={true} transitionAppearTimeout={2000}
                            transitionEnter={false} transitionLeave={false} >
                            <Player
                                source={this.state.videoSelected.url}
                                pause={this.state.pauseAd}
                                autoPlay={true}
                                onTimeUpdate={this._onTimeUpdate.bind(this)}
                            />
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
                : null
        );

        return (
            <div className="mainLayout-wrapper">
                <section className="iptv">
                    {advertisement}
                </section>

                <section className="videoLibrary">
                    <div className="header">
                        <Header/>
                    </div>
                    <div className="body">
                        <div className="videoList">
                            <p className="videoListTitle">Vídeos Não Vistos</p>
                            {
                                !_.isEmpty(this.props.actionData.videos.items.videosUnseen)?
                                <VideoList isFocused={this.state.unseen}
                                           onChange={this._changeList.bind(this)}
                                           videos={this.props.actionData.videos.items.videosUnseen}/>
                                    :
                                <div className="videoList-noVideo">
                                    <img src={require("../../../assets/images/icons/no-video.png")} />
                                </div>
                            }
                        </div>

                        <div className="videoList">
                            <p className="videoListTitle">Vídeos Vistos</p>
                            {
                                !_.isEmpty(this.props.actionData.videos.items.videosSeen)?
                                <VideoList isFocused={this.state.seen}
                                           onChange={this._changeList.bind(this)}
                                           videos={this.props.actionData.videos.items.videosSeen}/>
                                    :
                                <div className="videoList-noVideo">
                                    <img src={require("../../../assets/images/icons/no-video.png")} />
                                </div>
                            }
                        </div>
                    </div>
                </section>
            </div>
        );
    };

    componentWillUnmount() {
        document.removeEventListener('keydown', this._handleKey);
    };

    _handleKey(event) {

        // if (Screenfull.enabled) {
        //     Screenfull.request();
        // }

        if(event.keyCode == 40 && this.state.advertisement == false){
            if(!_.isEmpty(this.props.actionData.videos.items.videosSeen)){
                this.setState({seen:true, unseen:false});
            }
        } else if(event.keyCode == 38 && this.state.advertisement == false){
            if(!_.isEmpty(this.props.actionData.videos.items.videosUnseen)){
                this.setState({seen:false, unseen:true});
            }
        } else if(event.keyCode == 13 && !_.isEmpty(this.state.videoSelected.url)){
            if(this.state.unseen && !this.state.advertisement){
                this.props.actionCreators.advertisement({seen:1, informative_video_id:this.state.videoSelected.id});
                this.props.actionCreators.log({event:"SEEN VIDEO", informative_video_id:this.state.videoSelected.id});
            } else if (!this.state.unseen && !this.state.advertisement) {
                this.props.actionCreators.log({event:"VIDEO REWATCHED", informative_video_id:this.state.videoSelected.id});
            }

            if(this.state.advertisement){
                this._closeAdvertisement();
            } else{
                this.setState({advertisement:true});
            }
            // Tecla 0
        } else if (event.keyCode === 48 && this.state.advertisement == false) {
            this.props.actionCreators.log({event:`CLOSED LIBRARY KEY 48`});
            browserHistory.push(`/?id=${Auth.getId()}`);
        }
    }

    _changeList(event) {
        this.setState({videoSelected:event});
    }

    _onTimeUpdate(e){
        this.adTime = e;
        if(parseInt(e.current) == parseInt(e.total)){
            this._endedAdvertisement();
        }
    }

    _endedAdvertisement() {
        this.setState({pauseAd:true, advertisement:false}, ()=>{
            this.props.actionCreators.videos();
            this.props.actionCreators.advertisement({seen:100, informative_video_id:this.state.videoSelected.id});
        });
    }

    _closeAdvertisement() {
        let seen = parseInt((100 * this.adTime.current) / this.adTime.total);

        this.setState({advertisement:false}, ()=>{
            this.props.actionCreators.videos();
            this.props.actionCreators.advertisement({seen:seen, informative_video_id:this.state.videoSelected.id});
        });
    }
};

VideoLibrary.propTypes = {};

VideoLibrary.defaultProps = {};
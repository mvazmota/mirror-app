import React from 'react';
import Slider from 'react-image-slider';
import {Row, Column, Icon, Button} from 'react-foundation';
import _ from 'lodash';

export default class VideoList extends React.Component {

    constructor(props) {
        super(props);

        this.videos = this.props.videos;

        this.state = {
            selectedCard: 0,
            list: null
        };
    }

    componentWillMount(){
        if(this.props.isFocused){
            this.props.onChange(this.videos[this.state.selectedCard]);
        }
    }

    componentWillReceiveProps(nextProps){
        this.videos = nextProps.videos;
        if(this.props.isFocused != nextProps.isFocused && nextProps.isFocused){
            this.props.onChange(this.videos[this.state.selectedCard]);
        }
    }

    render() {
        return (
            <Slider
                isFocused={this.props.isFocused}
                ref="slider"
                onPositionChange={this._bla.bind(this)}
                images={this.videos.images}
                isInfinite={false}
                visibleItems={4}
                delay={0}
                scrollToBeginningIfEnd={false}
                skipScrollIfEnd={false}>
                {this.videos.map((video, key) =>
                    this.state.selectedCard==key && this.props.isFocused?
                        <div className="selectedCard card" key={key}>
                            <div className="card__image">
                                <img src={this._getImage(video.image)} />
                                <span className="card__play"><Icon name="fi-play-video large" /></span>
                                <div className="card__time">{`${Math.floor(video.duration / 60)}:${video.duration - Math.floor(video.duration / 60) * 60}`}</div>
                            </div>
                            <div className="card__title">{
                                _.truncate(video.title, {
                                    'length': 67,
                                    'separator': /,? +/
                                })}
                            </div>
                        </div>
                        :
                        <div className="card" key={key}>
                            <div className="card__image">
                                <img src={this._getImage(video.image)} />
                                <div className="card__time">{`${Math.floor(video.duration / 60)}:${video.duration - Math.floor(video.duration / 60) * 60}`}</div>
                            </div>
                            <div className="card__title">{
                                _.truncate(video.title, {
                                    'length': 67,
                                    'separator': /,? +/
                                })}
                            </div>
                        </div>
                )}
            </Slider>
        );
    };

    _bla(event){
        this.setState({selectedCard:event});
        this.props.onChange(this.videos[event]);
    }

    _getImage(image){
        switch(image){
            case 'transportes.png':
                return require("../../../../assets/images/asgies/resized/transportes.png");
                break;
            case 'social.png':
                return require("../../../../assets/images/asgies/resized/social.png");
                break;
            case 'seguranca.png':
                return require("../../../../assets/images/asgies/resized/seguranca.png");
                break;
            case 'saude.png':
                return require("../../../../assets/images/asgies/resized/saude.png");
                break;
            case 'financas.png':
                return require("../../../../assets/images/asgies/resized/financas.png");
                break;
            case 'cultura.png':
                return require("../../../../assets/images/asgies/resized/cultura.png");
                break;
            case 'autarquicos.png':
                return require("../../../../assets/images/asgies/resized/autarquicos.png");
            default:
                return require("../../../../assets/images/asgies/resized/autarquicos.png");
        }
    }

};

VideoList.propTypes = {
    onChange: React.PropTypes.func,
    videos: React.PropTypes.array,
    isFocused: React.PropTypes.bool.isRequired
};

VideoList.defaultProps = {};
'use strict';

import React from 'react';
import Splash from './template/SplashScreen';
import Info from './template/InfoScreen';
import Notification from './template/NotificationScreen';
import NotificationAlt from './template/NotificationScreenAlt';

export default class OverlayScreen extends React.Component {

    componentWillMount(){
        this.props.actionCreators.weather();
    }

    componentWillReceiveProps(nextProps){
        this.props = nextProps;
    }

    render() {

        return (
            <section className="overlay">
                {this._getScreen()}
            </section>
        );
    };

    _getScreen(){
        switch(this.props.screen){
            case 'splash':
                return <Splash/>;
            case 'info':
                return <Info weather={this.props.actionData.weather}/>;
            case 'noti':
                return <Notification/>;
            case 'alt':
                return <NotificationAlt/>;
            default:
                return null;
        }
    }


};

OverlayScreen.propTypes = {
    screen:React.PropTypes.string
};

OverlayScreen.defaultProps = {};
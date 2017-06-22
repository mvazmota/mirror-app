'use strict';

import React from 'react';

export default class SplashScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            weath: {},

        };


    }

    componentWillMount(){

    }

    render() {
        return (
            <div className="splashScreen">
                <div className="splash_loader">
                    <img  src={require("../../../../assets/images/logo/logo.png")} />

                    <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                </div>
            </div>
        );
    };

};


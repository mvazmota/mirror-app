'use strict';

import React from 'react';

export default class NotificationScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timer:10
        };
    }

    render() {
        return (
            <div>
                <div className="timer">{this.state.timer}</div>
                <div>
                    Se não quer ver o resto da notícia carregue em OK
                    <div className="ok">
                        <img  src={require("../../../../assets/images/icons/control_small_a.png")} />
                    </div>
                </div>
            </div>
        );
    };

    componentDidMount(){
        setInterval(function(){
            this.setState({timer:this.state.timer-1});
        }.bind(this),1000);
    }
};


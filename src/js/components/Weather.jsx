'use strict';

import React from 'react';
import {Row, Column, Icon, Button} from 'react-foundation';
import _ from 'lodash';

export default class Weather extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentWillMount(){
    }

    render() {

        let weather = this.props.weather;

        // console.log(weather);

        let weatherIcons = {
            'clear sky': {
                day: <img src={require("../../assets/images/icons/weather/01d.png")} />,
                night: <img src={require("../../assets/images/icons/weather/01n.png")} />,
                backImg: <img className="backgroundImage" src={require("../../assets/images/weather/clear sky-min.jpg")} />
            },
            'few clouds': {
                day: <img src={require("../../assets/images/icons/weather/02d.png")} />,
                night: <img src={require("../../assets/images/icons/weather/02n.png")} />,
                backImg: <img className="backgroundImage" src={require("../../assets/images/weather/few clouds-min.jpg")} />
            },
            'scattered clouds': {
                day: <img src={require("../../assets/images/icons/weather/03d.png")} />,
                night: <img src={require("../../assets/images/icons/weather/03n.png")} />,
                backImg: <img className="backgroundImage" src={require("../../assets/images/weather/scattered clouds-min.jpeg")} />
            },
            'broken clouds': {
                day: <img src={require("../../assets/images/icons/weather/04d.png")} />,
                night: <img src={require("../../assets/images/icons/weather/04n.png")} />,
                backImg: <img className="backgroundImage" src={require("../../assets/images/weather/broken clouds-min.jpeg")} />
            },
            'shower rain': {
                day: <img src={require("../../assets/images/icons/weather/09d.png")} />,
                night: <img src={require("../../assets/images/icons/weather/09n.png")} />,
                backImg: <img className="backgroundImage" src={require("../../assets/images/weather/rain-min.jpeg")} />
            },
            'rain': {
                day: <img src={require("../../assets/images/icons/weather/10d.png")} />,
                night: <img src={require("../../assets/images/icons/weather/10n.png")} />,
                backImg: <img className="backgroundImage" src={require("../../assets/images/weather/rain-min.jpeg")} />
            },
            'thunderstorm': {
                day: <img src={require("../../assets/images/icons/weather/11d.png")} />,
                night: <img src={require("../../assets/images/icons/weather/11n.png")} />,
                backImg: <img className="backgroundImage" src={require("../../assets/images/weather/thunderstorm-min.jpg")} />
            },
            'snow': {
                day: <img src={require("../../assets/images/icons/weather/13d.png")} />,
                night: <img src={require("../../assets/images/icons/weather/13n.png")} />,
                backImg: <img className="backgroundImage" src={require("../../assets/images/weather/snow-min.jpg")} />
            },
            'mist': {
                day: <img src={require("../../assets/images/icons/weather/04d.png")} />,
                night: <img src={require("../../assets/images/icons/weather/04n.png")} />,
                backImg: <img className="backgroundImage" src={require("../../assets/images/weather/mist-min.jpeg")} />
            }
        };

        // let temp = !_.isEmpty(this.props.actionData.weather.items)?this.props.actionData.weather.items.main.temp:'';
        // let iconCode = !_.isEmpty(this.props.actionData.weather.items)?this.props.actionData.weather.items.weather[0].description:'';
        // let icon = !_.isEmpty(this.props.actionData.weather.items)?
        //     hour>6 && hour<20?weatherIcons[iconCode].day:weatherIcons[iconCode].night:null;

        return (
            <div className="weather">
                    <Column>
                        <Row>22ºC</Row>
                        <Row>Max 25ºC</Row>
                        <Row>Min 14ºC</Row>
                    </Column>
                    <Column>
                        <Row>
                            <img src={require("../../assets/images/icons/weather/04d.png")} />
                        </Row>
                        <Row>Broken Clouds</Row>
                    </Column>
            </div>
        );
    };

};


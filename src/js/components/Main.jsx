'use strict';

import React from 'react';
import {Row, Column, Icon, Button} from 'react-foundation';
import _ from 'lodash';

export default class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            weath: {},
        };
    }

    componentWillMount(){
        this.props.actionCreators.weather();
    }

    render() {
        let month =  new Date().getMonth();
        let year =  new Date().getFullYear();
        let day =  new Date().getDay();
        let dayNr = new Date().getDate();
        let hour =  new Date().getHours();
        let minute =  new Date().getMinutes().toString().length == 1 ?`0${new Date().getMinutes()}`:`${new Date().getMinutes()}`;
        let monthsPT = ['Janeiro', 'Fevereiro', 'Março','Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

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

        let seasonsPT = ['Inverno', 'Inverno', 'Primavera', 'Primavera', 'Primavera', 'PIPI', 'Verão', 'Verão', 'Inverno'];
        let weekday = ['Domingo', '2ª feira', '3ª feira', '4ª feira', '5ª feira', '6ª feira', 'Sábado'];

        let temp = !_.isEmpty(this.props.actionData.weather.items)?this.props.actionData.weather.items.main.temp:'';
        let iconCode = !_.isEmpty(this.props.actionData.weather.items)?this.props.actionData.weather.items.weather[0].description:'';
        let icon = !_.isEmpty(this.props.actionData.weather.items)?
            hour>6 && hour<20?weatherIcons[iconCode].day:weatherIcons[iconCode].night:null;
        let image = !_.isEmpty(this.props.actionData.weather.items)?weatherIcons[iconCode].backImg:null;

        let message = 'Bom dia';
        if (hour > 12 && hour < 20){
            message = 'Boa tarde';
        } else if (hour > 20 || hour < 6) {
            message = 'Boa noite';
        }

        return (
            <div className="transition-item infoScreen ">
                {image}
                <div className="backgroundColor" />

                <Row>
                    <Column large={6} className="weather">
                        {icon}
                        {temp}º
                    </Column>
                    <Column large={6} className="time">{hour}:{minute}</Column>
                </Row>
                <div className="welcome">
                    <p>{message}!</p>
                    <p>Hoje é {weekday[day]}, {dayNr} de {monthsPT[month]} de {year}</p>
                    <p>Estamos na {seasonsPT[month]}</p>
                </div>
            </div>
        );
    };

};


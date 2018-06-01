import React, { Component } from 'react';
import Spinkit from './Spinkit';

class Weather extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.fetchWeather();
  }

  fetchWeather() {
    fetch('http://api.openweathermap.org/data/2.5/weather?q=stockholm&units=metric&lang=se&appid=a4e319ae63807cb27c223a9c11826288')
    .then(response => response.json())
    .then(response => {
      this.setState({
        weatherData: response
      })
    })
  }

  render() {
    if(!this.state.weatherData) 
    return (
    <div className="module-box"><span className="label">Vädret i</span>
    <Spinkit />
    </div>
    );

    var iconId = this.state.weatherData.weather[0].icon;
    let weatherIcon = "http://openweathermap.org/img/w/" + iconId + ".png";
    let fontSize = {fontSize: "0.85em", lineHeight: "1.5em", letterSpacing: "0.03em"};

    return (
      <div className="module-box weather"><span className="label">Vädret i</span>
        <h2 className="white">{this.state.weatherData.name}</h2>
        <img src={weatherIcon} alt={this.state.weatherData.weather[0].description}/>
        <h3 className="white">{this.state.weatherData.weather[0].description}</h3>
        <p className="font-fjalla white" style={fontSize}><span className="blue">Temperatur:</span> {this.state.weatherData.main.temp} °C
        <br/><span className="blue" >Vind:</span> {this.state.weatherData.wind.speed} m/s
        <br/><span className="blue" >Luftfuktighet</span> {this.state.weatherData.main.humidity} %
      </p>
      </div>
    );
  }
  
}

export default Weather;
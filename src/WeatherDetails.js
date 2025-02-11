// WeatherDetails.js - Class Component Version
import React, { Component } from "react";

class WeatherDetails extends Component {
  render() {
    const { feelsLike, humidity, windSpeed } = this.props.prop; // Destructure from props

    return (
      <div className="bottom">
        <div className="feels">
          <p>{feelsLike} °C</p>
          <p>Feels Like</p>
        </div>
        <div className="humidity">
          <p className="bold">{humidity} %</p>
          <p>Humidity</p>
        </div>
        <div className="wind">
          <p className="bold">{windSpeed} MPH</p>
          <p>Wind Speed</p>
        </div>
      </div>
    );
  }
}

export default WeatherDetails;

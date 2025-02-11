import React from "react";

const WeatherDetails = ({ prop }) => {
  const { feelsLike, humidity, windSpeed } = prop; // Destructure from props

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
};

export default WeatherDetails;

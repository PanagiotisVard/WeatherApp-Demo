import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import WeatherDetails from "./WeatherDetails";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=454df79af73efa0942bf333f8b4fd118`;

  useEffect(() => {
    if (!searchTriggered || !location) {
      return;
    }

    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(url);

        if (response.data.cod !== 200) {
          setErrorMessage("Location not found. Please try again.");
          setData({});
        } else {
          setErrorMessage("");
          setData(response.data);
        }
      } catch (error) {
        setErrorMessage("An error occurred. Please try again later.");
        setData({});
      } finally {
        setSearchTriggered(false);
      }
    };

    fetchWeatherData();
  }, [searchTriggered, location]); // useEffect will run only when searchTriggered or location changes

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      if (!location) {
        setErrorMessage("Please enter a location");
        setData({});
      } else {
        setErrorMessage("");
        setSearchTriggered(true);
      }
    }
  };

  return (
    <div className="App">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>

      {errorMessage && (
        <div className="error-modal">
          <div className="error-modal-content">
            <span className="error-close" onClick={() => setErrorMessage("")}>
              &times;
            </span>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp} °C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined && (
          <WeatherDetails
            prop={{
              feelsLike: data.main.feels_like,
              humidity: data.main.humidity,
              windSpeed: data.wind.speed,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;

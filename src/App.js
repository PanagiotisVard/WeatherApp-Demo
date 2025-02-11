import React, { Component } from "react";
import axios from "axios";
import "./index.css";
import WeatherDetails from "./WeatherDetails";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      location: "",
      errorMessage: "",
    };
  }

  // Handle the location search when the user presses Enter
  searchLocation = (event) => {
    if (event.key === "Enter") {
      const { location } = this.state;

      // If location is empty, show an error message
      if (!location) {
        this.setState({ errorMessage: "Please enter a location", data: {} });
      } else {
        this.setState({ errorMessage: "" }); // Clear any previous error
        this.fetchWeatherData(location); // Trigger the API call
      }
    }
  };

  // Fetch the weather data from the API
  fetchWeatherData = async (location) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=454df79af73efa0942bf333f8b4fd118`;

    try {
      const response = await axios.get(url);
      if (response.data.cod !== 200) {
        this.setState({
          errorMessage: "Location not found. Please try again.",
          data: {},
        });
      } else {
        this.setState({ errorMessage: "", data: response.data });
      }
    } catch (error) {
      this.setState({
        errorMessage: "An error occurred. Please try again later.",
        data: {},
      });
    }
  };

  render() {
    const { location, data, errorMessage } = this.state;

    return (
      <div className="App">
        <div className="search">
          <input
            value={location}
            onChange={(event) =>
              this.setState({ location: event.target.value })
            }
            onKeyPress={this.searchLocation}
            placeholder="Enter Location"
            type="text"
          />
        </div>

        {errorMessage && (
          <div className="error-modal">
            <div className="error-modal-content">
              <span
                className="error-close"
                onClick={() => this.setState({ errorMessage: "" })}
              >
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

          {/* Pass the necessary data to the WeatherDetails component */}
          {data.name && (
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
}

export default App;

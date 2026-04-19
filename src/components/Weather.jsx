import React, { useState } from "react";
import axios from "axios";
import "../styles/Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "e090266e9e1aa48c84980c9042f219a3";

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      setWeatherData(null);
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      setError("");
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (err) {
      setWeatherData(null);
      setError("City not found or API request failed.");
    }
  };

  return (
    <main className="weather-container">
      <section className="weather-card">
        <h1 className="title">🌤 Weather Report App</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>Search</button>
        </div>

        {error && <p className="error">{error}</p>}

        {weatherData && (
          <div className="weather-info">
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <p className="temp">{weatherData.main.temp}°C</p>
            <p className="desc">{weatherData.weather[0].description}</p>

            <div className="extra-info">
              <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
              <p><strong>Wind:</strong> {weatherData.wind.speed} m/s</p>
              <p><strong>Feels Like:</strong> {weatherData.main.feels_like}°C</p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Weather;
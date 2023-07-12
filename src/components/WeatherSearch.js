import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './WeatherSearch.css';

const WeatherSearch = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTodayWeather = useCallback(async () => {
    try {
      if (!location) {
        return; // Don't make the API request if location is empty
      }

      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8596a9c30dab076872da75d867058fad&units=metric`
      );
      const weatherData = response.data;
      setWeather(weatherData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    fetchTodayWeather();
  }, [fetchTodayWeather]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTodayWeather();
  };

  return (
    <div className="weather-search-container">
      <h2 className="weather-search-heading">Weather Search</h2>
      <form onSubmit={handleSubmit} className="weather-search-form">
        <input
          type="text"
          placeholder="Enter location"
          className="weather-search-input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit" className="weather-search-button">
          Search
        </button>
      </form>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : weather ? (
        <div className="weather">
          <h3 className="weather-name">{weather.name}</h3>
          <p className="weather-info">Temperature: {weather.main.temp}°C</p>
          <p className="weather-info">Humidity: {weather.main.humidity}%</p>
          <p className="weather-info">Description: {weather.weather[0].description}</p>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherSearch;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWeather } from '../utils/weatherAPI';

const WeatherDetails = () => {
  const { location } = useParams();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeatherDetails = async () => {
      try {
        const data = await fetchWeather(location);
        setWeather(data);
      } catch (error) {
        console.error('Error fetching weather details:', error);
      }
    };

    fetchWeatherDetails();
  }, [location]);

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{weather.name}</h2>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Description: {weather.weather[0].description}</p>
    </div>
  );
};

export default WeatherDetails;

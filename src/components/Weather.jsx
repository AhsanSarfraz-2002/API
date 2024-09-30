import React, { useEffect, useState } from 'react';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('http://api.weatherapi.com/v1/current.json?key=bcb75dfb1b584d16b56174834243009&q=lahore&aqi=no');
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Weather Data for {weather.location.name}</h2>
      <p><strong>Region:</strong> {weather.location.region}</p>
      <p><strong>Country:</strong> {weather.location.country}</p>
      <p><strong>Temperature (°C):</strong> {weather.current.temp_c}</p>
      <p><strong>Condition:</strong> {weather.current.condition.text}</p>
      <p><strong>Humidity:</strong> {weather.current.humidity}%</p>
      <p><strong>Wind Speed (km/h):</strong> {weather.current.wind_kph}</p>
      <p><strong>Last Updated:</strong> {weather.current.last_updated}</p>
    </div>
  );
};

export default Weather;

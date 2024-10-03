import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setError('');
    if (!city) return;

    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=bcb75dfb1b584d16b56174834243009&q=${city}&aqi=no`);
      setWeather(response.data);
    } catch (err) {
      setError('Error fetching weather data. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Weather App</h1>
      <form onSubmit={handleSubmit} className="flex mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-500 text-white rounded-r-md p-2 hover:bg-blue-600 transition duration-200">
          Get Weather
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {weather && (
        <div className="bg-white rounded-md shadow-md p-4 text-center">
          <h2 className="text-xl font-semibold">{weather.location.name}</h2>
          <p className="text-lg">Temperature: {weather.current.temp_c}°C</p>
          <p className="text-lg">Condition: {weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt={weather.current.condition.text} className="mt-2" />
        </div>
      )}
    </div>
  );
};

export default Weather;

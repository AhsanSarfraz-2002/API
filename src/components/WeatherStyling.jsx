import React, { useEffect, useState } from 'react';

const WeatherStyling = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [celsius, setCelsius] = useState(true);
  const [city, setCity] = useState('lahore');

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=bcb75dfb1b584d16b56174834243009&q=${city}&aqi=no`);
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
  }, [city]);

  const conversion = (celsius) => (celsius * 9 / 5) + 32;

  const search = (event) => {
    event.preventDefault();
    const form = event.target;
    const inputCity = form.elements.city.value.trim();
    if (inputCity) {
      setCity(inputCity);
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-4">Error: {error}</div>;

  const temperature = celsius ? weather.current.temp_c : conversion(weather.current.temp_c);
  const temperatureUnit = celsius ? '°C' : '°F';
  const weatherIconUrl = weather.current.condition.icon;

  return (
    <div className="bg-gradient-to-br from-blue-400 to-red-500 min-h-screen flex items-center justify-center">
  <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    <form onSubmit={search} className="flex border-b border-gray-200">
      <input
        type="text" 
        name="city"
        placeholder="Enter city"
        className="border-none outline-none rounded-tl-lg p-3 w-full placeholder-gray-400 focus:ring-2 focus:ring-blue-300 transition"
      />
      <button
        type="submit"
        className="w-1/4 bg-blue-500 text-white rounded-tr-lg p-3 hover:bg-blue-600 transition"
      >
        Search
      </button>
    </form>
    <div className='p-6'>
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Weather Data for {weather.location.name}</h2>
      <div className="flex justify-center mb-4">
        <img src={weatherIconUrl} alt={weather.current.condition.text} className="w-24" />
      </div>
      <p className="text-gray-700"><strong>Region:</strong> {weather.location.region}</p>
      <p className="text-gray-700"><strong>Country:</strong> {weather.location.country}</p>
      <p className="text-gray-700"><strong>Temperature:</strong> {temperature}{temperatureUnit}</p>
      <p className="text-gray-700"><strong>Condition:</strong> {weather.current.condition.text}</p>
      <p className="text-gray-700"><strong>Humidity:</strong> {weather.current.humidity}%</p>
      <p className="text-gray-700"><strong>Wind Speed:</strong> {weather.current.wind_kph} km/h</p>
      <p className="text-gray-700"><strong>Last Updated:</strong> {weather.current.last_updated}</p>
      <button
        onClick={() => setCelsius(!celsius)}
        className="mt-4 w-full bg-gray-200 rounded-md p-3 hover:bg-gray-300 transition"
      >
        Switch to {celsius ? 'Fahrenheit' : 'Celsius'}
      </button>
    </div>
  </div>
</div>

  );
};

export default WeatherStyling;

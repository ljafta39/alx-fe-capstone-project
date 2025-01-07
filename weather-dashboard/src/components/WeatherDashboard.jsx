//WeatherDashboard.jsx
import React, { useState, useEffect } from 'react';

/**
 * A React component that displays a weather dashboard. It fetches weather data
 * from OpenWeatherMap API for a given city or by coordinates. It also saves
 * recent searches to local storage and updates weather data every 5 minutes.
 *
 * @returns {React.ReactElement} A React component that displays a weather
 * dashboard.
 */
const WeatherDashboard = () => {
  const [currentCity, setCurrentCity] = useState('New York'); // Default city
  const [recentSearches, setRecentSearches] = useState(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    return savedSearches ? JSON.parse(savedSearches) : [];
  });
  const [weatherData, setWeatherData] = useState(null); // Holds weather data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  // Fetch weather data for a given city
  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
      if (!recentSearches.includes(city)) {
        setRecentSearches((prev) => [city, ...prev.slice(0, 4)]); // Keep only the last 5 searches
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather data by coordinates
  const fetchWeatherByCoords = async (latitude, longitude) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
      setCurrentCity(data.name); // Update the current city based on coordinates
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update weather data every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentCity) fetchWeather(currentCity);
    }, 300000); // 5 minutes

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currentCity]);

  // Get user's location using Geolocation API
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      (error) => {
        console.error('Geolocation error:', error);
        fetchWeather('New York'); // Fallback to default city
      }
    );
  }, []);

  // Save recent searches to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Weather Dashboard</h1>
      <div className="mt-4">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {weatherData && (
          <div>
            <h2 className="text-xl font-semibold">{weatherData.name}</h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Recent Searches</h3>
        <ul>
          {recentSearches.map((city, index) => (
            <li key={index}>
              <button
                className="text-blue-500 underline"
                onClick={() => fetchWeather(city)}
              >
                {city}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter city"
          className="border p-2 mr-2 text-black"
          onKeyDown={(e) => {
            if (e.key === 'Enter') fetchWeather(e.target.value);
          }}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => fetchWeather(currentCity)}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default WeatherDashboard;

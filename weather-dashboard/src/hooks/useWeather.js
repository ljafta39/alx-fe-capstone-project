import { useState, useEffect } from 'react';
import { fetchWeatherData, fetchForecastData } from '../utils/api';

/**
 * Custom hook for fetching weather and forecast data.
 * @param {string} location - Location for which to fetch weather data.
 * @param {string} units - Units for temperature ('metric' or 'imperial').
 * @returns {Object} Weather data, forecast data, loading state, and error state.
 */
const useWeather = (location, units = 'metric') => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const weatherData = await fetchWeatherData(location, units);
        const forecastData = await fetchForecastData(location, units);
        setWeather(weatherData);
        setForecast(forecastData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location, units]);

  return { weather, forecast, loading, error };
};

export default useWeather;

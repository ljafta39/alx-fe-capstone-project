// import axios from 'axios';

// const API_KEY = '0fe2f86cc954bd0b9492641307d02269';
// const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// export const fetchWeatherData = async (city) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/weather`, {
//       params: { q: city, appid: API_KEY, units: 'metric' },
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
//   }
// };

// export const fetchForecastData = async (city) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/forecast/daily`, {
//       params: { q: city, appid: API_KEY, units: 'metric', cnt: 7 },
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Failed to fetch forecast data');
//   }
// };
// /src/utils/api.jsx

const API_KEY = "0fe2f86cc954bd0b9492641307d02269"; // Replace with your actual API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeather = async (city, units, lang, setWeather, setForecast, setLoading, setError) => {
  try {
    setLoading(true);
    setError(null);

    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&units=${units}&lang=${lang}&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    setWeather(data);

    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?q=${city}&units=${units}&lang=${lang}&appid=${API_KEY}`
    );
    if (!forecastResponse.ok) {
      throw new Error("Failed to fetch forecast data");
    }

    const forecastData = await forecastResponse.json();
    setForecast(forecastData);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

export const fetchWeatherByCoords = async (lat, lon, units, lang, setWeather, setForecast, setLoading, setError) => {
  try {
    setLoading(true);
    setError(null);

    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    setWeather(data);

    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${API_KEY}`
    );
    if (!forecastResponse.ok) {
      throw new Error("Failed to fetch forecast data");
    }

    const forecastData = await forecastResponse.json();
    setForecast(forecastData);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

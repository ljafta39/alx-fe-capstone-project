import { BASE_URL, API_KEY } from "../config/api";

export const weatherService = {
    async getWeatherByCoords(lat, lon, units, lang) {
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${API_KEY}`
      );
      if (!weatherResponse.ok) throw new Error("Weather data not available");
      return await weatherResponse.json();
    },
  
    async getForecastByCoords(lat, lon, units, lang) {
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${API_KEY}`
      );
      if (!forecastResponse.ok) throw new Error("Forecast data not available");
      return await forecastResponse.json();
    },
  
    async getCityCoords(city) {
      const geoResponse = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      if (!geoResponse.ok) throw new Error("City not found");
      const geoData = await geoResponse.json();
      if (!geoData.length) throw new Error("City not found");
      return geoData[0];
    }
  };
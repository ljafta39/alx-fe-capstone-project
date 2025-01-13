import React, { useState, useEffect } from "react";
import { Sun, Moon, RefreshCw } from "lucide-react";
import { LANGUAGES } from './constants/languages';
import { Alert } from './components/Alert';
import { WeatherBackground } from './components/WeatherBackground';
import { WeatherCard } from './components/WeatherCard';
import { SearchBar } from './components/SearchBar';
import { weatherService } from './services/weatherService';
import { processForecastData } from './utils/weatherUtils';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [units, setUnits] = useState("metric");
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("en");

  const t = LANGUAGES[lang];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(savedTheme === "dark" || (!savedTheme && prefersDark));

    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          fetchWeather("London");
        }
      );
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);

      const weatherData = await weatherService.getWeatherByCoords(lat, lon, units, lang);
      setWeather(weatherData);

      const forecastData = await weatherService.getForecastByCoords(lat, lon, units, lang);
      const dailyForecasts = processForecastData(forecastData.list);
      setForecast({ daily: dailyForecasts });
    } catch (err) {
      console.error('Fetch Error:', err);
      setError(t.error.weatherData);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError(null);

      const { lat, lon } = await weatherService.getCityCoords(city);
      await fetchWeatherByCoords(lat, lon);

      const updatedSearches = [city, ...recentSearches.filter(s => s !== city)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    } catch (err) {
      setError(t.error.cityNotFound);
      } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <div className="min-h-screen transition-colors duration-200">
      {weather && <WeatherBackground condition={weather.weather[0].main} />}
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold dark:text-white">Weather Dashboard</h1>
            <div className="flex gap-4">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-white dark:bg-gray-800 rounded-lg px-2 py-1 text-sm"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {isDark ? <Sun className="text-white" /> : <Moon />}
              </button>
            </div>
          </div>

          <SearchBar
            onSearch={fetchWeather}
            placeholder={t.search}
            recentSearches={recentSearches}
          />

          {error && (
            <Alert variant="destructive">
              {error}
            </Alert>
          )}

          {loading ? (
            <div className="flex justify-center">
              <RefreshCw className="animate-spin h-8 w-8 text-blue-500" />
            </div>
          ) : (
            <WeatherCard 
              data={weather} 
              forecast={forecast}
              units={units}
              lang={lang}
            />
          )}
        </div>
        <footer className="transition-colors duration-200 text-center">
         <p>&copy; {new Date().getFullYear()} Weather Dashboard</p>
         <p>Powered by OpenWeatherMap</p>
         <p>Created by L Jafta</p>
      </footer>
      </div>
    </div>
  );
}

export default App;
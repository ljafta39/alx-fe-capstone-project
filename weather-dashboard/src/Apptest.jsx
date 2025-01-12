// // App.jsx
// import React from 'react';
// import WeatherDashboard from './components/WeatherDashboard';

// const App = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-500 to-indigo-700 ">
//       <header className="p-4 bg-blue-600 shadow-md">
//         <h1 className="text-center text-2xl font-bold">Weather Dashboard</h1>
//       </header>
//       <main className="container mx-auto p-4">
//         <WeatherDashboard />
//       </main>
//       <footer className="p-4 text-center bg-blue-600">
//         <p>&copy; {new Date().getFullYear()} Weather Dashboard</p>
//       </footer>
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from "react";
import { Sun, Moon, Search, RefreshCw, AlertCircle, Globe, MapPin } from "lucide-react";

// Languages supported
// const LANGUAGES = {
//   en: {
//     search: "Search for a city...",
//     temperature: "Temperature",
//     humidity: "Humidity",
//     windSpeed: "Wind Speed",
//     forecast: "7-Day Forecast",
//     recentSearches: "Recent Searches",
//     high: "High",
//     low: "Low",
//     loading: "Loading...",
//     error: {
//       cityNotFound: "City not found. Please try again.",
//       weatherData: "Failed to fetch weather data",
//     },
//   },
//   es: {
//     search: "Buscar una ciudad...",
//     temperature: "Temperatura",
//     humidity: "Humedad",
//     windSpeed: "Velocidad del viento",
//     forecast: "Pronóstico de 7 días",
//     recentSearches: "Búsquedas recientes",
//     high: "Máxima",
//     low: "Mínima",
//     loading: "Cargando...",
//     error: {
//       cityNotFound: "Ciudad no encontrada. Inténtalo de nuevo.",
//       weatherData: "Error al obtener datos meteorológicos",
//     },
//   },
//   fr: {
//     search: "Rechercher une ville...",
//     temperature: "Température",
//     humidity: "Humidité",
//     windSpeed: "Vitesse du vent",
//     forecast: "Prévisions sur 7 jours",
//     recentSearches: "Recherches récentes",
//     high: "Max",
//     low: "Min",
//     loading: "Chargement...",
//     error: {
//       cityNotFound: "Ville non trouvée. Veuillez réessayer.",
//       weatherData: "Échec de la récupération des données météo",
//     },
//   },
// };

// // Custom Alert Component
// const Alert = ({ children, variant = "default" }) => {
//   const baseClasses = "p-4 rounded-lg mb-4 flex items-center gap-2";
//   const variants = {
//     default: "bg-blue-100 text-blue-800",
//     destructive: "bg-red-100 text-red-800",
//   };

//   return (
//     <div className={`${baseClasses} ${variants[variant]}`}>
//       <AlertCircle className="h-4 w-4" />
//       <p>{children}</p>
//     </div>
//   );
// };
const API_KEY = "0fe2f86cc954bd0b9492641307d02269"; // Replace with your API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";
// Weather Background Component
// const WeatherBackground = ({ condition }) => {
//   const getBackgroundClass = () => {
//     const conditions = {
//       Clear: "bg-gradient-to-br from-yellow-400 to-blue-400",
//       Clouds: "bg-gradient-to-br from-gray-400 to-blue-300",
//       Rain: "bg-gradient-to-br from-gray-600 to-blue-600",
//       Snow: "bg-gradient-to-br from-blue-100 to-gray-200",
//       Thunderstorm: "bg-gradient-to-br from-gray-800 to-purple-900",
//       default: "bg-gradient-to-br from-blue-400 to-blue-600",
//     };
//     return conditions[condition] || conditions.default;
//   };

//   return (
//     <div 
//       className={`fixed inset-0 -z-10 transition-all duration-1000 ${getBackgroundClass()}`}
//     />
//   );
// };

// Forecast Card Component

// Updated helper function to process the forecast data
const processForecastData = (forecastList) => {
  const dailyData = {};
  
  forecastList.forEach(item => {
    // Get date without time
    const date = new Date(item.dt * 1000).toLocaleDateString();
    
    if (!dailyData[date]) {
      dailyData[date] = {
        dt: item.dt,
        temp: {
          max: -Infinity,
          min: Infinity
        },
        weather: item.weather
      };
    }
    
    // Update max/min temperatures
    if (item.main.temp_max > dailyData[date].temp.max) {
      dailyData[date].temp.max = item.main.temp_max;
    }
    if (item.main.temp_min < dailyData[date].temp.min) {
      dailyData[date].temp.min = item.main.temp_min;
    }
  });

  return Object.values(dailyData);
};

// Updated ForecastCard component with debugging
// const ForecastCard = ({ data, units, lang }) => {
//   // Add console.log to debug the data
//   console.log('Forecast Card Data:', data);

//   if (!data) return null;

//   const date = new Date(data.dt * 1000);
//   const day = date.toLocaleDateString(
//     lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : 'fr-FR', 
//     { weekday: 'short' }
//   );

//   return (
//     <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-lg">
//       <p className="text-center font-semibold dark:text-white">{day}</p>
//       {data.weather && data.weather[0] && (
//         <img
//           src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
//           alt={data.weather[0].description}
//           className="w-12 h-12 mx-auto"
//         />
//       )}
//       <div className="text-sm text-center dark:text-gray-300">
//         <p>{Math.round(data.temp.max)}°{units === 'metric' ? 'C' : 'F'}</p>
//         <p className="text-gray-500 dark:text-gray-400">
//           {Math.round(data.temp.min)}°{units === 'metric' ? 'C' : 'F'}
//         </p>
//       </div>
//     </div>
//   );
// };
// Weather card component
// const WeatherCard = ({ data, forecast, units, lang }) => {
//   // Add console.log to debug the forecast data
//   console.log('Weather Card Forecast Data:', forecast);

//   if (!data) return null;

//   const t = LANGUAGES[lang];
//   const temp = units === "metric"
//     ? `${Math.round(data.main.temp)}°C`
//     : `${Math.round((data.main.temp * 9/5) + 32)}°F`;

//   return (
//     <div className="space-y-6">
//       {/* Current weather card */}
//       <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-6 shadow-lg backdrop-blur-sm">
//         <div className="flex justify-between items-start">
//           <div>
//             <h2 className="text-2xl font-bold dark:text-white">{data.name}</h2>
//             <p className="text-gray-500 dark:text-gray-400">{data.weather[0].description}</p>
//           </div>
//           <img
//             src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
//             alt={data.weather[0].description}
//             className="w-16 h-16"
//           />
//         </div>
//         <div className="mt-4">
//           <p className="text-4xl font-bold dark:text-white">{temp}</p>
//           <div className="mt-4 grid grid-cols-2 gap-4">
//             <div>
//               <p className="text-gray-500 dark:text-gray-400">{t.humidity}</p>
//               <p className="text-xl dark:text-white">{data.main.humidity}%</p>
//             </div>
//             <div>
//               <p className="text-gray-500 dark:text-gray-400">{t.windSpeed}</p>
//               <p className="text-xl dark:text-white">
//                 {units === "metric"
//                   ? `${Math.round(data.wind.speed * 3.6)} km/h`
//                   : `${Math.round(data.wind.speed * 2.237)} mph`}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Forecast card */}
//       {forecast && forecast.daily && forecast.daily.length > 0 && (
//         <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-6 shadow-lg backdrop-blur-sm">
//           <h3 className="text-xl font-semibold mb-4 dark:text-white">{t.forecast}</h3>
//           <div className="grid grid-cols-5 gap-2">
//             {forecast.daily.slice(0, 7).map((day, index) => (
//               <ForecastCard 
//                 key={day.dt || index} 
//                 data={day} 
//                 units={units} 
//                 lang={lang} 
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// Main App component
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
    // Load theme preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(savedTheme === "dark" || (!savedTheme && prefersDark));

    // Load recent searches
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }

    // Get user's location
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
  
      // Fetch current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${API_KEY}`
      );
      if (!weatherResponse.ok) throw new Error("Weather data not available");
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);
  
      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${API_KEY}`
      );
      if (!forecastResponse.ok) throw new Error("Forecast data not available");
      const forecastData = await forecastResponse.json();
      
      // Process and log forecast data
      console.log('Raw Forecast Data:', forecastData);
      const dailyForecasts = processForecastData(forecastData.list);
      console.log('Processed Daily Forecasts:', dailyForecasts);
      
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

      // Fetch coordinates for the city
      const geoResponse = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      if (!geoResponse.ok) throw new Error("City not found");
      const geoData = await geoResponse.json();
      
      if (!geoData.length) {
        throw new Error("City not found");
      }

      const { lat, lon } = geoData[0];
      await fetchWeatherByCoords(lat, lon);

      // Update recent searches
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

          <div className="mb-8 space-y-4">
            <form onSubmit={(e) => {
              e.preventDefault();
              const city = e.target.city.value.trim();
              if (city) fetchWeather(city);
            }} className="w-full">
              <div className="relative">
                <input
                  name="city"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder={t.search}
                  list="recent-searches"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>

            {recentSearches.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {recentSearches.map((city) => (
                  <button
                    key={city}
                    onClick={() => fetchWeather(city)}
                    className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white"
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>

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
      </div>
      <footer className="p-4 text-center bg-blue-600">
//         <p>&copy; {new Date().getFullYear()} Weather Dashboard</p>
//       </footer>
    </div>
  );
}

export default App;

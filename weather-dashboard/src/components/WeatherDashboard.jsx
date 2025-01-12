// import React, { useState, useEffect } from 'react';

// const WeatherDashboard = () => {
//   const [currentCity, setCurrentCity] = useState('New York'); // Default city
//   const [recentSearches, setRecentSearches] = useState(() => {
//     const savedSearches = localStorage.getItem('recentSearches');
//     return savedSearches ? JSON.parse(savedSearches) : [];
//   });
//   const [weatherData, setWeatherData] = useState(null); // Holds weather data
//   const [loading, setLoading] = useState(false); // Loading state
//   const [error, setError] = useState(null); // Error state
  

//   const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;// Replace with your OpenWeatherMap API key

//   // Fetch weather data for a given city
//   const fetchWeather = async (city) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
//       );
//       if (!response.ok) {
//         throw new Error('Failed to fetch weather data');
//       }
//       const data = await response.json();
//       setWeatherData(data);
//       if (!recentSearches.includes(city)) {
//         setRecentSearches((prev) => [city, ...prev.slice(0, 4)]); // Keep only the last 5 searches
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch weather data by coordinates
//   const fetchWeatherByCoords = async (latitude, longitude) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
//       );
//       if (!response.ok) {
//         throw new Error('Failed to fetch weather data');
//       }
//       const data = await response.json();
//       setWeatherData(data);
//       setCurrentCity(data.name); // Update the current city based on coordinates
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update weather data every 5 minutes
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (currentCity) fetchWeather(currentCity);
//     }, 300000); // 5 minutes

//     return () => clearInterval(interval); // Cleanup interval on unmount
//   }, [currentCity]);

//   // Get user's location using Geolocation API
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         fetchWeatherByCoords(latitude, longitude);
//       },
//       (error) => {
//         console.error('Geolocation error:', error);
//         fetchWeather('New York'); // Fallback to default city
//       }
//     );
//   }, []);

//   // Save recent searches to local storage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
//   }, [recentSearches]);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">Weather Dashboard</h1>
//       <div className="mt-4">
//         {loading && <p>Loading...</p>}
//         {error && <p className="text-red-500">Error: {error}</p>}
//         {weatherData && (
//           <div>
//             <h2 className="text-xl font-semibold">{weatherData.name}</h2>
//             <p>Temperature: {weatherData.main.temp}°C</p>
//             <p>Weather: {weatherData.weather[0].description}</p>
//             <p>Humidity: {weatherData.main.humidity}%</p>
//             <p>Wind Speed: {weatherData.wind.speed} m/s</p>
//             <p>Weather Icon: {weatherData.weather[0].icon}</p>
//             <img
//               src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
//               alt="weather icon"
//             />
//           </div>
//         )}
//       </div>
//       <div className="mt-4">
//         <h3 className="text-lg font-semibold">Recent Searches</h3>
//         <ul>
//           {recentSearches.map((city, index) => (
//             <li key={index}>
//               <button
//                 className="text-blue-500 underline"
//                 onClick={() => fetchWeather(city)}
//               >
//                 {city}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="mt-4">
//         <input
//           type="text"
//           placeholder="Enter city"
//           className="border p-2 mr-2"
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') fetchWeather(e.target.value);
//           }}
//         />
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//           onClick={() => fetchWeather(currentCity)}
//         >
//           Search
//         </button>
//       </div>
//     </div>
//   );
// };

// export default WeatherDashboard;
import React, { useState, useEffect } from "react";
import { Sun, Moon, Search, RefreshCw, AlertCircle } from "lucide-react";

// Custom Alert Component
const Alert = ({ children, variant = "default" }) => {
  const baseClasses = "p-4 rounded-lg mb-4 flex items-center gap-2";
  const variants = {
    default: "bg-blue-100 text-blue-800",
    destructive: "bg-red-100 text-red-800",
  };

  return (
    <div className={`${baseClasses} ${variants[variant]}`}>
      <AlertCircle className="h-4 w-4" />
      <p>{children}</p>
    </div>
  );
};

// Weather API configuration
const API_KEY = "0fe2f86cc954bd0b9492641307d02269"; // Replace with your API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Custom hook for theme
const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return [isDark, toggleTheme];
};

// Search bar component
const SearchBar = ({ onSearch, recentSearches }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search for a city..."
          list="recent-searches"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <Search size={20} />
        </button>
        <datalist id="recent-searches">
          {recentSearches.map((search, index) => (
            <option key={index} value={search} />
          ))}
        </datalist>
      </div>
    </form>
  );
};

// Weather card component
const WeatherCard = ({ data, units }) => {
  if (!data) return null;

  const temp = units === "metric"
    ? `${Math.round(data.main.temp)}°C`
    : `${Math.round((data.main.temp * 9/5) + 32)}°F`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">{data.name}</h2>
          <p className="text-gray-500 dark:text-gray-400">{data.weather[0].description}</p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
          className="w-16 h-16"
        />
      </div>
      <div className="mt-4">
        <p className="text-4xl font-bold dark:text-white">{temp}</p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Humidity</p>
            <p className="text-xl dark:text-white">{data.main.humidity}%</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Wind Speed</p>
            <p className="text-xl dark:text-white">
              {units === "metric"
                ? `${Math.round(data.wind.speed * 3.6)} km/h`
                : `${Math.round(data.wind.speed * 2.237)} mph`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App component
function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [units, setUnits] = useState("metric");
  const [isDark, toggleTheme] = useTheme();

  useEffect(() => {
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
          fetchWeather("London"); // Default city
        }
      );
    }
  }, []);

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error("Weather data not available");
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${BASE_URL}/weather?q=${city}&units=${units}&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather(data);
      
      const updatedSearches = [city, ...recentSearches.filter(s => s !== city)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    } catch (err) {
      setError("City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold dark:text-white">Weather Dashboard</h1>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isDark ? <Sun className="text-white" /> : <Moon />}
            </button>
          </div>

          <div className="mb-8">
            <SearchBar onSearch={fetchWeather} recentSearches={recentSearches} />
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
            <WeatherCard data={weather} units={units} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
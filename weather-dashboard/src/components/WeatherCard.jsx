import React from "react";
import ForecastCard from "./ForecastCard";
import { LANGUAGES } from "../utils/constants";

const WeatherCard = ({ data, forecast, units, lang }) => {
  if (!data) return null;

  const t = LANGUAGES[lang];
  const temp = units === "metric"
    ? `${Math.round(data.main.temp)}°C`
    : `${Math.round((data.main.temp * 9/5) + 32)}°F`;

  return (
    <div className="space-y-6">
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-6 shadow-lg backdrop-blur-sm">
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
              <p className="text-gray-500 dark:text-gray-400">{t.humidity}</p>
              <p className="text-xl dark:text-white">{data.main.humidity}%</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">{t.windSpeed}</p>
              <p className="text-xl dark:text-white">
                {units === "metric"
                  ? `${Math.round(data.wind.speed * 3.6)} km/h`
                  : `${Math.round(data.wind.speed * 2.237)} mph`}
              </p>
            </div>
          </div>
        </div>
      </div>
      {forecast && forecast.daily && forecast.daily.length > 0 && (
        <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-6 shadow-lg backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">{t.forecast}</h3>
          <div className="grid grid-cols-5 gap-2">
            {forecast.daily.slice(0, 7).map((day, index) => (
              <ForecastCard 
                key={day.dt || index} 
                data={day} 
                units={units} 
                lang={lang} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;

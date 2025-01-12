import React from "react";

const ForecastCard = ({ data, units, lang }) => {
  if (!data) return null;

  const date = new Date(data.dt * 1000);
  const day = date.toLocaleDateString(
    lang === "en" ? "en-US" : lang === "es" ? "es-ES" : "fr-FR",
    { weekday: "short" }
  );

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-lg">
      <p className="text-center font-semibold dark:text-white">{day}</p>
      {data.weather && data.weather[0] && (
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
          className="w-12 h-12 mx-auto"
        />
      )}
      <div className="text-sm text-center dark:text-gray-300">
        <p>{Math.round(data.temp.max)}°{units === "metric" ? "C" : "F"}</p>
        <p className="text-gray-500 dark:text-gray-400">
          {Math.round(data.temp.min)}°{units === "metric" ? "C" : "F"}
        </p>
      </div>
    </div>
  );
};

export default ForecastCard;

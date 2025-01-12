import React from "react";

const WeatherBackground = ({ condition }) => {
  const getBackgroundClass = () => {
    const conditions = {
      Clear: "bg-gradient-to-br from-yellow-400 to-blue-400",
      Clouds: "bg-gradient-to-br from-gray-400 to-blue-300",
      Rain: "bg-gradient-to-br from-gray-600 to-blue-600",
      Snow: "bg-gradient-to-br from-blue-100 to-gray-200",
      Thunderstorm: "bg-gradient-to-br from-gray-800 to-purple-900",
      default: "bg-gradient-to-br from-blue-400 to-blue-600",
    };
    return conditions[condition] || conditions.default;
  };

  return (
    <div 
      className={`fixed inset-0 -z-10 transition-all duration-1000 ${getBackgroundClass()}`}
    />
  );
};

export default WeatherBackground;

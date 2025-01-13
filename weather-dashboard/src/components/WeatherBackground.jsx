  /**
   * WeatherBackground
   *
   * A component that renders a background gradient that transitions depending
   * on the weather condition.
   *
   * @param {Object} props The component props.
   * @param {string} props.condition The weather condition.
   *
   * @returns {React.ReactElement} A React element representing the background
   * gradient.
   */
export const WeatherBackground = ({ condition }) => {
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
  
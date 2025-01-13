/**
 * Processes a list of forecast data and aggregates it by date.
 *
 * For each date, this function calculates the maximum and minimum temperatures
 * and stores the associated weather information.
 *
 * @param {Array} forecastList - An array of forecast data objects. Each object
 * contains a `dt` timestamp, temperature details in `main`, and `weather` information.
 *
 * @returns {Array} An array of objects, each representing aggregated weather data
 * for a single day, including the date, max/min temperatures, and weather details.
 */

export const processForecastData = (forecastList) => {
    const dailyData = {};
    
    forecastList.forEach(item => {
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
      
      if (item.main.temp_max > dailyData[date].temp.max) {
        dailyData[date].temp.max = item.main.temp_max;
      }
      if (item.main.temp_min < dailyData[date].temp.min) {
        dailyData[date].temp.min = item.main.temp_min;
      }
    });
  
    return Object.values(dailyData);
  };
  
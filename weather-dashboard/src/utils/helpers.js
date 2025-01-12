export const processForecastData = (forecastList) => {
    const dailyData = {};
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyData[date]) {
        dailyData[date] = {
          dt: item.dt,
          temp: { max: -Infinity, min: Infinity },
          weather: item.weather,
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
  
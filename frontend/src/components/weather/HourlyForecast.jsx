import React, { useState, useEffect } from 'react';
import { weatherService } from '../../services/apiClient';

const HourlyForecast = ({ city }) => {
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    const getHourly = async () => {
      try {
        const data = await weatherService.getForecast(city);
        // Take the first 6 time intervals (next 18 hours)
        setHourlyData(data.list.slice(0, 6));
      } catch (error) {
        console.error("Failed to load hourly forecast");
      }
    };
    getHourly();
  }, [city]);

  return (
    <div className="glass-panel p-6">
      <h3 className="text-xl font-bold mb-6">Hourly Forecast (Next 18 Hours)</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {hourlyData.map((item, index) => {
          const timeString = new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return (
            <div key={index} className="glass-card p-4 text-center flex flex-col items-center justify-between">
              <p className="text-sm text-gray-300 font-medium">{timeString}</p>
              <img 
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt="weather icon"
                className="w-12 h-12 my-2"
              />
              <p className="text-lg font-bold text-white mb-1">{Math.round(item.main.temp)}°C</p>
              <p className="text-xs text-blue-300 capitalize">{item.weather[0].main}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
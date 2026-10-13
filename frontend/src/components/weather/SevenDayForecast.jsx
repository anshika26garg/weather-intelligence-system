import React, { useState, useEffect } from 'react';
import { weatherService } from '../../services/apiClient';

const SevenDayForecast = ({ city }) => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const getForecast = async () => {
      try {
        const data = await weatherService.getForecast(city);
        const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));
        setForecast(dailyData);
      } catch (error) {
        console.error("Failed to load forecast");
      }
    };
    getForecast();
  }, [city]);

  return (
    <div className="glass-panel p-6 h-full">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <span>5-Day Forecast</span>
        <span className="text-xs font-normal text-blue-300 bg-blue-900/50 px-2 py-1 rounded-full">Standard</span>
      </h3>
      
      <div className="space-y-4">
        {forecast.map((day, index) => {
          const date = new Date(day.dt * 1000);
          return (
            <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="w-1/4">
                <p className="font-medium">{index === 0 ? 'Tomorrow' : date.toLocaleDateString('en-US', { weekday: 'long' })}</p>
                <p className="text-xs text-gray-400">{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
              </div>
              <div className="w-1/4 flex justify-center">
               <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description} />
              </div>
              <div className="w-1/4 text-center">
                <span className="text-sm text-gray-300 capitalize">{day.weather[0].description}</span>
              </div>
              <div className="w-1/4 text-right font-bold text-lg">
                {Math.round(day.main.temp)}°C
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default SevenDayForecast;

import React from 'react';
import { WiThermometer, WiHumidity, WiStrongWind, WiBarometer } from 'react-icons/wi';

const CurrentWeatherCard = ({ data }) => {
  return (
    <div className="glass-panel p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
      
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-white mb-2">{data.name}, {data.sys.country}</h2>
        <p className="text-gray-300 capitalize mb-6">{data.weather[0].description}</p>
        
        <div className="flex items-center justify-between mb-8">
          <div className="text-6xl font-bold text-white">
            {Math.round(data.main.temp)}°
          </div>
          <img 
            src={`https://openweathermap.org/img/wn/` + data.weather[0].icon + `@2x.png`}
            alt="Weather icon"
            className="w-24 h-24 drop-shadow-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
            <WiThermometer className="text-3xl text-orange-400" />
            <div>
              <p className="text-xs text-gray-400">Feels Like</p>
              <p className="font-semibold">{Math.round(data.main.feels_like)}°C</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
            <WiHumidity className="text-3xl text-blue-400" />
            <div>
              <p className="text-xs text-gray-400">Humidity</p>
              <p className="font-semibold">{data.main.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
            <WiStrongWind className="text-3xl text-teal-400" />
            <div>
              <p className="text-xs text-gray-400">Wind Speed</p>
              <p className="font-semibold">{data.wind.speed} m/s</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
            <WiBarometer className="text-3xl text-purple-400" />
            <div>
              <p className="text-xs text-gray-400">Pressure</p>
              <p className="font-semibold">{data.main.pressure} hPa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;
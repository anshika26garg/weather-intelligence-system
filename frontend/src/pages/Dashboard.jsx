import React, { useState, useEffect } from 'react';
import SearchBar from '../components/layout/SearchBar';
import CurrentWeatherCard from '../components/weather/CurrentWeatherCard';
import SevenDayForecast from '../components/weather/SevenDayForecast';
import WeatherAlerts from '../components/weather/WeatherAlerts';
import WeatherInsights from '../components/weather/WeatherInsights';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { weatherService } from '../services/apiClient';

const Dashboard = ({ currentCity, onSearch }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [mlData, setMlData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [current, ml] = await Promise.all([
          weatherService.getCurrentWeather(currentCity),
          weatherService.getPredictionsAndInsights(currentCity)
        ]);
        setWeatherData(current);
        setMlData(ml);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch weather data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentCity]);

  return (
    <div className="space-y-8 animate-fade-in">
      <SearchBar onSearch={onSearch} />
      
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      
      {!loading && !error && weatherData && mlData && (
        <>
          <WeatherAlerts alerts={mlData.alerts} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-8">
              <CurrentWeatherCard data={weatherData} />
              <WeatherInsights insights={mlData.insights} />
            </div>
            
            <div className="lg:col-span-2">
              <SevenDayForecast city={currentCity} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
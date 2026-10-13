import React, { useState, useEffect } from 'react';
import TrendChart from '../components/charts/TrendChart';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { weatherService } from '../services/apiClient';

const Analytics = ({ currentCity }) => {
  const [forecast, setForecast] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const [forecastData, mlData] = await Promise.all([
          weatherService.getForecast(currentCity),
          weatherService.getPredictionsAndInsights(currentCity)
        ]);
        setForecast(forecastData);
        setPredictions(mlData.predictions);
      } catch (err) {
        setError('Failed to load analytics data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [currentCity]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  const dailyData = forecast?.list?.filter((item, index) => index % 8 === 0) || [];
  const labels = dailyData.map(item => new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }));
  const temps = dailyData.map(item => item.main.temp);
  const hums = dailyData.map(item => item.main.humidity);

  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-6">Predictive Weather Intelligence for {currentCity}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-6 text-center">
          <p className="text-gray-400 mb-2">Rain Probability (24h)</p>
          <p className="text-3xl font-bold text-blue-400">{predictions?.rain_probability || 0}%</p>
        </div>
        <div className="glass-panel p-6 text-center">
          <p className="text-gray-400 mb-2">Predicted Temp (24h)</p>
          <p className="text-3xl font-bold text-yellow-400">{predictions?.predicted_temp_next_24h || '--'}°C</p>
        </div>
        <div className="glass-panel p-6 text-center">
          <p className="text-gray-400 mb-2">Predicted Humidity (24h)</p>
          <p className="text-3xl font-bold text-teal-400">{predictions?.predicted_humidity_next_24h || '--'}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold mb-4">5-Day Temperature Trend</h3>
          <div className="h-64">
            <TrendChart labels={labels} dataPoints={temps} label="Temperature (°C)" color="rgb(250, 204, 21)" />
          </div>
        </div>
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold mb-4">5-Day Humidity Trend</h3>
          <div className="h-64">
             <TrendChart labels={labels} dataPoints={hums} label="Humidity (%)" color="rgb(45, 212, 191)" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

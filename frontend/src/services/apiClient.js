import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const weatherService = {
  getCurrentWeather: async (city) => {
    const response = await apiClient.get(`/weather/current?city=${city}`);
    return response.data;
  },
  getForecast: async (city) => {
    const response = await apiClient.get(`/weather/forecast?city=${city}`);
    return response.data;
  },
  getPredictionsAndInsights: async (city) => {
    const response = await apiClient.get(`/ml/predict?city=${city}`);
    return response.data;
  }
};
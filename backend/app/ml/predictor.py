import pickle
import pandas as pd
from app.config import Config

class WeatherPredictor:
    def __init__(self):
        self.rain_model = self._load_model(Config.RAIN_MODEL_PATH)
        self.temp_model = self._load_model(Config.TEMP_MODEL_PATH)
        self.humidity_model = self._load_model(Config.HUMIDITY_MODEL_PATH)

    def _load_model(self, path):
        try:
            with open(path, 'rb') as f:
                return pickle.load(f)
        except FileNotFoundError:
            return None

    def predict_future_weather(self, current_weather_data):
        """Generates predictions based on live weather data."""
        if not all([self.rain_model, self.temp_model, self.humidity_model]):
            return {"error": "Models not loaded. Please run trainer.py first."}

        # Extract features from OpenWeatherMap current data response
        main = current_weather_data.get('main', {})
        wind = current_weather_data.get('wind', {})
        
        features = pd.DataFrame([{
            'temp': main.get('temp', 0),
            'humidity': main.get('humidity', 0),
            'pressure': main.get('pressure', 0),
            'wind_speed': wind.get('speed', 0)
        }])

        # Predict Rain Probability (using predict_proba for percentage)
        rain_prob = self.rain_model.predict_proba(features)[0][1] * 100
        
        # Predict values
        next_temp = self.temp_model.predict(features)[0]
        next_humidity = self.humidity_model.predict(features)[0]

        return {
            "rain_probability": round(rain_prob, 2),
            "predicted_temp_next_24h": round(next_temp, 2),
            "predicted_humidity_next_24h": round(next_humidity, 2)
        }
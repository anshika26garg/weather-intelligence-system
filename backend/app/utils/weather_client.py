import requests
from app.config import Config

class WeatherClient:
    def __init__(self):
        self.api_key = Config.OPENWEATHER_API_KEY
        self.base_url = "https://api.openweathermap.org/data/2.5"

    def get_current_weather(self, city: str):
        if not self.api_key or self.api_key == 'your_openweathermap_api_key_here':
            raise ValueError("OpenWeatherMap API key is missing or invalid.")
            
        url = f"{self.base_url}/weather?q={city}&appid={self.api_key}&units=metric"
        response = requests.get(url)
        
        if response.status_code != 200:
            raise Exception(response.json().get('message', 'Failed to fetch current weather'))
            
        return response.json()

    def get_forecast(self, city: str):
        if not self.api_key or self.api_key == 'your_openweathermap_api_key_here':
            raise ValueError("OpenWeatherMap API key is missing or invalid.")
            
        url = f"{self.base_url}/forecast?q={city}&appid={self.api_key}&units=metric"
        response = requests.get(url)
        
        if response.status_code != 200:
            raise Exception(response.json().get('message', 'Failed to fetch weather forecast'))
            
        return response.json()
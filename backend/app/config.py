import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """Base configuration."""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev_secret_key_12345')
    OPENWEATHER_API_KEY = os.environ.get('OPENWEATHER_API_KEY')
    PORT = int(os.environ.get('PORT', 5000))
    DEBUG = os.environ.get('FLASK_ENV') == 'development'
    
    # Machine Learning Model Paths
    BASE_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
    MODEL_DIR = os.path.join(BASE_DIR, 'models')
    RAIN_MODEL_PATH = os.path.join(MODEL_DIR, 'rain_rf_model.pkl')
    TEMP_MODEL_PATH = os.path.join(MODEL_DIR, 'temp_lr_model.pkl')
    HUMIDITY_MODEL_PATH = os.path.join(MODEL_DIR, 'humidity_rfr_model.pkl')
    DATA_PATH = os.path.join(BASE_DIR, 'data', 'historical_weather_dataset.csv')
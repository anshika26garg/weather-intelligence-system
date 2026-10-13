import pandas as pd
import numpy as np
import pickle
import os
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.linear_model import LinearRegression
from app.config import Config

def generate_synthetic_data(filepath):
    print("Generating synthetic historical dataset...")
    np.random.seed(42)
    # REDUCED from 2000 to 500 for faster training
    dates = pd.date_range(start='2020-01-01', periods=500, freq='D')
    
    temp = np.random.normal(loc=25, scale=10, size=500)
    humidity = np.clip(np.random.normal(loc=60, scale=20, size=500), 10, 100)
    pressure = np.random.normal(loc=1013, scale=10, size=500)
    wind_speed = np.random.exponential(scale=5, size=500)
    
    rain_target = ((humidity > 75) & (pressure < 1010)).astype(int)
    noise = np.random.binomial(1, 0.1, size=500)
    rain_target = np.logical_xor(rain_target, noise).astype(int)

    df = pd.DataFrame({
        'date': dates,
        'temp': temp,
        'humidity': humidity,
        'pressure': pressure,
        'wind_speed': wind_speed,
        'target_rain': rain_target,
        'target_temp': temp + np.random.normal(0, 2, 500), 
        'target_humidity': humidity + np.random.normal(0, 5, 500) 
    })
    
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    df.to_csv(filepath, index=False)
    return df

def train_models():
    os.makedirs(Config.MODEL_DIR, exist_ok=True)
    
    if not os.path.exists(Config.DATA_PATH):
        df = generate_synthetic_data(Config.DATA_PATH)
    else:
        df = pd.read_csv(Config.DATA_PATH)

    features = ['temp', 'humidity', 'pressure', 'wind_speed']
    X = df[features]
    
    print("Training Rain Model...")
    y_rain = df['target_rain']
    # REDUCED n_estimators from 100 to 10
    rain_model = RandomForestClassifier(n_estimators=10, random_state=42)
    rain_model.fit(X, y_rain)
    with open(Config.RAIN_MODEL_PATH, 'wb') as f:
        pickle.dump(rain_model, f)

    print("Training Temp Model...")
    y_temp = df['target_temp']
    temp_model = LinearRegression()
    temp_model.fit(X, y_temp)
    with open(Config.TEMP_MODEL_PATH, 'wb') as f:
        pickle.dump(temp_model, f)

    print("Training Humidity Model...")
    y_hum = df['target_humidity']
    # REDUCED n_estimators from 100 to 10
    hum_model = RandomForestRegressor(n_estimators=10, random_state=42)
    hum_model.fit(X, y_hum)
    with open(Config.HUMIDITY_MODEL_PATH, 'wb') as f:
        pickle.dump(hum_model, f)
    
    print("All models trained and saved successfully.")

if __name__ == "__main__":
    train_models()
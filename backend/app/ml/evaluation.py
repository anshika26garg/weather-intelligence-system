import pandas as pd
import pickle
from sklearn.metrics import accuracy_score, precision_score, recall_score, mean_squared_error, r2_score
from app.config import Config

def evaluate_models():
    print("--- Model Evaluation Report ---")
    df = pd.read_csv(Config.DATA_PATH)
    X = df[['temp', 'humidity', 'pressure', 'wind_speed']]
    
    # Evaluate Rain Model
    with open(Config.RAIN_MODEL_PATH, 'rb') as f:
        rain_model = pickle.load(f)
    rain_preds = rain_model.predict(X)
    print("\n1. Rain Prediction (Random Forest Classifier)")
    print(f"Accuracy:  {accuracy_score(df['target_rain'], rain_preds):.4f}")
    print(f"Precision: {precision_score(df['target_rain'], rain_preds):.4f}")
    print(f"Recall:    {recall_score(df['target_rain'], rain_preds):.4f}")

    # Evaluate Temp Model
    with open(Config.TEMP_MODEL_PATH, 'rb') as f:
        temp_model = pickle.load(f)
    temp_preds = temp_model.predict(X)
    print("\n2. Temperature Prediction (Linear Regression)")
    print(f"MSE:       {mean_squared_error(df['target_temp'], temp_preds):.4f}")
    print(f"R2 Score:  {r2_score(df['target_temp'], temp_preds):.4f}")

    # Evaluate Humidity Model
    with open(Config.HUMIDITY_MODEL_PATH, 'rb') as f:
        hum_model = pickle.load(f)
    hum_preds = hum_model.predict(X)
    print("\n3. Humidity Prediction (Random Forest Regressor)")
    print(f"MSE:       {mean_squared_error(df['target_humidity'], hum_preds):.4f}")
    print(f"R2 Score:  {r2_score(df['target_humidity'], hum_preds):.4f}")

if __name__ == "__main__":
    evaluate_models()
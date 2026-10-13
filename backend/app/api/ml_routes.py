from flask import Blueprint, request, jsonify
from app.utils.weather_client import WeatherClient
from app.utils.insights_generator import generate_weather_insights
from app.ml.predictor import WeatherPredictor

ml_bp = Blueprint('ml', __name__)
client = WeatherClient()
predictor = WeatherPredictor()

@ml_bp.route('/predict', methods=['GET'])
def predict_and_analyze():
    city = request.args.get('city')
    if not city:
        return jsonify({"error": "City parameter is required"}), 400

    try:
        # 1. Fetch live data
        current_data = client.get_current_weather(city)
        forecast_data = client.get_forecast(city)
        
        # 2. Run ML Models
        ml_results = predictor.predict_future_weather(current_data)
        
        # 3. Generate textual insights & alerts
        insights_data = generate_weather_insights(current_data, forecast_data, ml_results)
        
        return jsonify({
            "predictions": ml_results,
            "alerts": insights_data['alerts'],
            "insights": insights_data['insights']
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
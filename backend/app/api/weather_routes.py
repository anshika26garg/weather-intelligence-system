from flask import Blueprint, request, jsonify
from app.utils.weather_client import WeatherClient

weather_bp = Blueprint('weather', __name__)
client = WeatherClient()

@weather_bp.route('/current', methods=['GET'])
def get_current():
    city = request.args.get('city')
    if not city:
        return jsonify({"error": "City parameter is required"}), 400
        
    try:
        data = client.get_current_weather(city)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@weather_bp.route('/forecast', methods=['GET'])
def get_forecast():
    city = request.args.get('city')
    if not city:
        return jsonify({"error": "City parameter is required"}), 400
        
    try:
        data = client.get_forecast(city)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
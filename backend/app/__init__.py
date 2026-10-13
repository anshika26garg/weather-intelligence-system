from flask import Flask
from flask_cors import CORS
from app.config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Enable Cross-Origin Resource Sharing for the React frontend
    CORS(app)

    # Import blueprints (routes)
    from app.api.weather_routes import weather_bp
    from app.api.ml_routes import ml_bp

    # Register blueprints
    app.register_blueprint(weather_bp, url_prefix='/api/weather')
    app.register_blueprint(ml_bp, url_prefix='/api/ml')

    # Simple health check endpoint
    @app.route('/health', methods=['GET'])
    def health_check():
        return {
            "status": "success",
            "message": "Weather Intelligence API is running properly."
        }, 200

    return app
def generate_weather_insights(current_data, forecast_data=None, ml_predictions=None):
    insights = []
    alerts = []

    # Safely extract current weather metrics
    main_data = current_data.get('main', {})
    wind_data = current_data.get('wind', {})
    weather_array = current_data.get('weather', [{}])
    
    temp = main_data.get('temp', 0)
    humidity = main_data.get('humidity', 0)
    wind_speed = wind_data.get('speed', 0)
    uv_index = current_data.get('uvi', 0) # Requires OneCall API, defaulting to 0 if standard API
    weather_id = weather_array[0].get('id', 800)

    # --- Generate Intelligent Alerts ---
    if temp >= 35:
        alerts.append("Heatwave Warning: Temperatures exceed 35°C. Risk of heat exhaustion.")
    elif temp <= 5:
        alerts.append("Cold Wave Alert: Temperatures have dropped to dangerous levels.")
    
    if humidity >= 85 and temp >= 25:
        alerts.append("High Heat Index: Extreme humidity is making it feel significantly hotter.")
        
    if wind_speed >= 15: # meters per second (~54 km/h)
        alerts.append("Strong Winds Warning: Secure outdoor objects and be cautious.")
        
    if uv_index >= 8:
        alerts.append("High UV Index: Avoid direct sunlight and apply sunscreen.")

    # Weather Code specific alerts (OpenWeatherMap standard condition codes)
    if 200 <= weather_id <= 232:
        alerts.append("Thunderstorm Alert: Seek shelter immediately.")
    elif 500 <= weather_id <= 531:
        alerts.append("Heavy Rain Alert: Potential for localized flooding.")
    elif weather_id == 741 or weather_id == 701:
        alerts.append("Fog Alert: Reduced visibility on roads. Drive carefully.")

    # --- Generate Readable Insights ---
    if ml_predictions:
        rain_prob = ml_predictions.get('rain_probability', 0)
        if rain_prob > 70:
            insights.append(f"Rainfall probability is extremely high ({rain_prob:.1f}%). Don't forget your umbrella.")
        elif rain_prob > 40:
            insights.append(f"There is a moderate chance of rain today ({rain_prob:.1f}%).")

    if humidity > 70 and temp > 22:
        insights.append("Expect sticky and uncomfortable conditions due to elevated humidity levels.")
    elif humidity < 30:
        insights.append("The air is quite dry today. Consider staying hydrated and using moisturizer.")

    if forecast_data:
        try:
            # Check the forecast 24 hours from now (8 intervals of 3 hours)
            tomorrow_temp = forecast_data['list'][8]['main']['temp']
            temp_diff = tomorrow_temp - temp
            
            if temp_diff > 3:
                insights.append("Tomorrow will be noticeably warmer than today.")
            elif temp_diff < -3:
                insights.append("Brace for a temperature drop; tomorrow will be significantly cooler.")
            else:
                insights.append("Temperatures are expected to remain stable over the next 24 hours.")
        except (IndexError, KeyError):
            pass

    if not insights:
        insights.append("Weather conditions are relatively stable with no extreme deviations expected.")

    return {
        "alerts": alerts,
        "insights": insights
    }
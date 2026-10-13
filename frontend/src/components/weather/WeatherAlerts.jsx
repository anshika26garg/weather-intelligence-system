import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

const WeatherAlerts = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;
  return (
    <div className="space-y-3 mb-6">
      {alerts.map((alert, index) => (
        <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-100">
          <FiAlertTriangle className="text-xl text-red-400 flex-shrink-0" />
          <p className="text-sm font-medium">{alert}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherAlerts;

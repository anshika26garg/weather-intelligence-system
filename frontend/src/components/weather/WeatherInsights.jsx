import React from 'react';
import { FiInfo } from 'react-icons/fi';

const WeatherInsights = ({ insights }) => {
  if (!insights || insights.length === 0) return null;
  return (
    <div className="glass-panel p-6">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <FiInfo className="text-blue-400" />
        Intelligent Insights
      </h3>
      <ul className="space-y-4">
        {insights.map((insight, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-300 text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
            {insight}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherInsights;

import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const TrendChart = ({ labels, dataPoints, label, color }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.9)', titleColor: '#fff', bodyColor: '#fff', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1, padding: 10, displayColors: false } },
    scales: { x: { grid: { display: false, drawBorder: false }, ticks: { color: 'rgba(255,255,255,0.5)' } }, y: { grid: { color: 'rgba(255,255,255,0.1)', drawBorder: false }, ticks: { color: 'rgba(255,255,255,0.5)' } } },
    interaction: { mode: 'index', intersect: false },
  };
  const data = { labels, datasets: [ { fill: true, label: label, data: dataPoints, borderColor: color, backgroundColor: color.replace('rgb', 'rgba').replace(')', ', 0.1)'), borderWidth: 2, tension: 0.4, pointRadius: 4, pointBackgroundColor: '#1e293b', pointBorderColor: color, pointBorderWidth: 2, pointHoverRadius: 6 } ] };
  return <Line options={options} data={data} />;
};

export default TrendChart;

// MyAreaChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

function MyAreaChart({ data }) {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    elements: {
      line: {
        tension: 0.4, // Set the tension for a curved line
      },
    },
  };
  return <Line data={data} options={options} />;
}

export default MyAreaChart;

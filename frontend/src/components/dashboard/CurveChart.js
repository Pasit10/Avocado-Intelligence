// MyAreaChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

function CurveChart({ data }) {
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
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: true, 
        },
        ticks: {
          display: true, 
        }
      },
      y: {
        grid: {
          display: true, 
        },
        ticks: {
          font: {
            size: 12
          }
        }
      }
    }
  };

  return <Line data={data} options={options} />;
}

export default CurveChart;
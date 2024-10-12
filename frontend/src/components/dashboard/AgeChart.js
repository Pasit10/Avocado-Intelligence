import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'; // Do not delete

const AgeChart = ({ onFullScreen, fullScreenData, ageStats, dataType, dateLog }) => {
  
  // Function to get day name
  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' }); // 'Mon', 'Tue', 'Wed', etc.
  };

  // Function to generate chart data
  const generateChartData = (labels, ageStats) => ({
    labels: labels,
    datasets: [
      {
        label: 'Average Age',
        data: ageStats,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  });

  const getChartOptions = (isXAxisVisible) => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: true, 
        },
        ticks: {
          display: isXAxisVisible, 
        }
      },
      y: {
        grid: {
          display: true, 
        },
        ticks: {
          font: {
            size: 12
          },
        }
      }
    }
  });

  // Determine labels and data based on dataType
  const labels = dataType === 'week' ? dateLog.map(date => getDayName(date)) : dateLog;
  const chartData = generateChartData(labels, ageStats);
  const chartOptions = getChartOptions(dataType !== 'month'); // Hide x-axis for 'month'

  return (
    <div className="dashboard-col">
      <div className="card shadow">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Age/{dataType}</h6>
        </div>
        <div 
          className="card-body" 
          onClick={() => {
            fullScreenData(chartData);
            onFullScreen('Line');
          }}        
        >
          <div className="chart-container">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeChart;

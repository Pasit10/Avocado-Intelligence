import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'; //Do not delete

const GenderChart = ({ onFullScreen, fullScreenData, genderStats, dataType, dateLog }) => {
  
  // Function to get day name
  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' }); // 'Mon', 'Tue', 'Wed', etc.
  };

  // Labels and chart data generator function
  const generateChartData = (labels, genderStats) => ({
    labels: labels,
    datasets: [
      {
        label: 'Male',
        data: genderStats.male,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)', 
        borderWidth: 1,
      },
      {
        label: 'Female',
        data: genderStats.female,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  });

  // Options to show/hide x-axis
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
            size: 12,
          },
          stepSize: 1,
        }
      }
    }
  });

  // Determine labels and data based on dataType
  const labels = dataType === 'week' ? dateLog.map(date => getDayName(date)) : dateLog;
  const chartData = generateChartData(labels, genderStats);
  const chartOptions = getChartOptions(dataType !== 'month'); // Hide x-axis for 'month'

  return (
    <div className="dashboard-col">
      <div className="card shadow">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Gender/{dataType}</h6>
        </div>
        <div className="card-body"  
            onClick={() => {
                fullScreenData(chartData);
                onFullScreen('Bar');
          }}>
        <div className="chart-container">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenderChart;

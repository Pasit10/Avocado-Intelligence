import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'; // Do not delete

const RaceChart = ({ onFullScreen, fullScreenData, raceStats, dataType, dateLog }) => {

  // Function to get day name
  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' }); // 'Mon', 'Tue', 'Wed', etc.
  };

  // Function to generate chart data based on labels and raceStats
  const generateChartData = (labels, raceStats) => ({
    labels: labels,
    datasets: [
      {
        label: 'Asian',
        data: raceStats.map(item => item.Asian),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
      {
        label: 'White',
        data: raceStats.map(item => item.White),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
      {
        label: 'Black',
        data: raceStats.map(item => item.Black),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
      {
        label: 'Indian',
        data: raceStats.map(item => item.Indian),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2,
      },
      {
        label: 'Others',
        data: raceStats.map(item => item.Others),
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 2,
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
            size: 12
          },
          stepSize: 1,
        }
      }
    }
  });

  // Determine labels based on dataType (week or month)
  const labels = dataType === 'week' ? dateLog.map(date => getDayName(date)) : dateLog;

  // Generate chart data and options
  const chartData = generateChartData(labels, raceStats);
  const chartOptions = getChartOptions(dataType !== 'month'); // Hide x-axis for 'month'

  return (
    <div className="dashboard-col">
      <div className="card shadow">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Race/{dataType}</h6>
        </div>
        <div className="card-body" 
          onClick={() => {
            fullScreenData(chartData);
            onFullScreen('Line');
          }}>
          <div className="chart-container">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaceChart;

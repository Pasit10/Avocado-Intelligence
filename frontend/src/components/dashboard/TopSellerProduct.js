import React from 'react';
import CurveChart from './CurveChart';
import { Chart as ChartJS } from 'chart.js/auto'; //Do not delete

const RaceChart = ({ onFullScreen, fullScreenData, topFiveProduct, dataType }) => {
  
  const getChartOptions = {
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

  const chartData = {
    labels: topFiveProduct.map(product => product.name),
    datasets: [
      {
        label: 'Total Quantity',
        data: topFiveProduct.map(product => product.total_qty), 
        backgroundColor: ['rgba(75, 192, 192, 0.2)'], 
        borderColor: ['rgba(75, 192, 192, 1)'], 
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="dashboard-col">
      <div className="card shadow">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Top 5 Products/{dataType}</h6>
        </div>
        <div className="card-body"          
         onClick={() => {
            fullScreenData(chartData); 
            onFullScreen('CurveChart');
          }}>
          <div className="chart-container">
            <CurveChart data={chartData} options={getChartOptions}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaceChart;

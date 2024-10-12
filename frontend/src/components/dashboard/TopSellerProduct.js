import React from 'react';
import CurveChart from './CurveChart';
import { polarAreaChartDataTwo } from './demoData/DemoChart';
import { Chart as ChartJS } from 'chart.js/auto'; //Do not delete

const RaceChart = ({ onFullScreen, fullScreenData }) => {
  
  // เปลี่ยนเป็นฟังก์ชัน
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

  return (
    <div className="dashboard-col">
      <div className="card shadow">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Product</h6>
        </div>
        <div className="card-body"          
         onClick={() => {
            fullScreenData(polarAreaChartDataTwo);
            onFullScreen('CurveChart');
          }}>
          <div className="chart-container">
            <CurveChart data={polarAreaChartDataTwo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaceChart;

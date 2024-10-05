import React, { useState } from 'react';
import { Line, Bar, Doughnut, Radar, PolarArea } from 'react-chartjs-2'; //npm install chart.js react-chartjs-2
import { Chart as ChartJS } from 'chart.js/auto'; //Do not delete
import { lineChartData, barChartData, doughnutChartData, radarChartData, polarAreaChartData, polarAreaChartDataTwo } from './demoData/DemoChart';
import MyAreaChart from './MyAreaChart';
import './style/Dashboard.css';

function Dashboard({selectedRows, setSelectedRows}) {
  const [fullScreenChart, setFullScreenChart] = useState(null);

  const handleFullScreen = (chartType) => {
    setFullScreenChart(chartType);
  };

  const handleCloseFullScreen = () => {
    setFullScreenChart(null);
  };

  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content" className="container-fluid">
        <div className="dashboard-row">
          {/* Line Chart */}
          <div className="dashboard-col">
            <div className="card shadow">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Line Chart</h6>
              </div>
              <div className="card-body" onClick={() => handleFullScreen('Line')}>
                <div className="chart-container">
                  <Line data={lineChartData} />
                </div>
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="dashboard-col">
            <div className="card shadow">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Bar Chart</h6>
              </div>
              <div className="card-body" onClick={() => handleFullScreen('Bar')}>
                <div className="chart-container">
                  <Bar data={barChartData} />
                </div>
              </div>
            </div>
          </div>

          {/* Doughnut Chart */}
          <div className="dashboard-col">
            <div className="card shadow">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Doughnut Chart</h6>
              </div>
              <div className="card-body" onClick={() => handleFullScreen('Doughnut')}>
                <div className="chart-container">
                  <Doughnut data={doughnutChartData} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-row">
          {/* Radar Chart */}
          <div className="dashboard-col">
            <div className="card shadow">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Radar Chart</h6>
              </div>
              <div className="card-body" onClick={() => handleFullScreen('Radar')}>
                <div className="chart-container">
                  <Radar data={radarChartData} />
                </div>
              </div>
            </div>
          </div>

          {/* Polar Area Chart */}
          <div className="dashboard-col">
            <div className="card shadow">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Polar Area Chart</h6>
              </div>
              <div className="card-body" onClick={() => handleFullScreen('PolarArea')}>
                <div className="chart-container">
                  <PolarArea data={polarAreaChartData} />
                </div>
              </div>
            </div>
          </div>

          {/* My Area Chart */}
          <div className="dashboard-col">
            <div className="card shadow">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Polar Area Chart 2</h6>
              </div>
              <div className="card-body" onClick={() => handleFullScreen('PolarArea2')}>
                <div className="chart-container">
                  <MyAreaChart data={polarAreaChartDataTwo} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {fullScreenChart && (
          <div className="fullscreen-overlay" onClick={handleCloseFullScreen}>
            <div className="fullscreen-chart">
              {fullScreenChart === 'Line' && <Line data={lineChartData} />}
              {fullScreenChart === 'Bar' && <Bar data={barChartData} />}
              {fullScreenChart === 'Doughnut' && <Doughnut data={doughnutChartData} />}
              {fullScreenChart === 'Radar' && <Radar data={radarChartData} />}
              {fullScreenChart === 'PolarArea' && <PolarArea data={polarAreaChartData} />}
              {fullScreenChart === 'PolarArea2' && <MyAreaChart data={polarAreaChartDataTwo} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

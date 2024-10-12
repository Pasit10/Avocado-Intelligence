import React from 'react';
import CurveChart from './CurveChart';
import { Line, Bar } from 'react-chartjs-2';

const FullScreenChart = ({ fullScreenChart, onClose ,data}) => {
  return (
    fullScreenChart && (
      <div className="fullscreen-overlay" onClick={onClose}>
        <div className="fullscreen-chart">
          {fullScreenChart === 'Line' && <Line data={data}  />}
          {fullScreenChart === 'Bar' && <Bar data={data} />}
          {fullScreenChart === 'CurveChart' && <CurveChart data={data} />}
          {/* {fullScreenChart === 'TopSeller' && <CurveChart data={polarAreaChartDataTwo} />}
          {fullScreenChart === 'PolarArea' && <PolarArea data={polarAreaChartData} />} */}
        </div>
      </div>
    )
  );
};

export default FullScreenChart;

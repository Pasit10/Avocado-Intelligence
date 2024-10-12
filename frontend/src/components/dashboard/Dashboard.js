import React, { useState, useEffect } from "react";
import AgeChart from './AgeChart';
import GenderChart from './GenderChart';
import RaceChart from './RaceChart';
import TopSeller from './TopSeller';
import StatisticalData from './StatisticalData';
import FullScreenChart from './FullScreenChart';
import TopSellerProduct from "./TopSellerProduct";
import './style/Dashboard.css';
import { Chart as ChartJS } from 'chart.js/auto'; // Do not delete

function Dashboard() {
  const [fullScreenChart, setFullScreenChart] = useState(null);
  const [fullScreenData, setFullScreenData] = useState(null);
  const [customerStatistics, setCustomerStatistics] = useState(null);

  const [dateType, setDateType] = useState('week'); 
  const [ageStats, setAgeStats] = useState([]);
  const [raceStats, setRaceStats] = useState([]);
  const [dateLog, setDateLog] = useState([]);
  const [genderStats, setGenderStats] = useState({ female: [], male: [] });

  const handleFullScreen = (chartType) => {
    setFullScreenChart(chartType);
  };

  const handleFullScreenData = (data) => {
    setFullScreenData(data);
  };

  const handleCloseFullScreen = () => {
    setFullScreenChart(null);
  };

  const handleDateTypeChange = (event) => {
    setDateType(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        const customerResponse = await fetch(`http://localhost:8080/dashboard/getcustomer?datetype=${dateType}`);
        if (!customerResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const customerData = await customerResponse.json();
  
        const ages = customerData.map(item => item.age.avg);
        setAgeStats(ages);
        
        const date = customerData.map(item => item.transaction_date);
        setDateLog(date);
  
        const raceStatsArray = customerData.map(item => ({
          transaction_date: item.transaction_date,
          Asian: item.race.Asian || 0,
          White: item.race.White || 0,
          Black: item.race.Black || 0,
          Indian: item.race.Indian || 0,
          Others: item.race.Others || 0,
        }));
        setRaceStats(raceStatsArray);
  
        const gender = customerData.reduce((acc, item) => {
          acc.female.push(item.sex.female || 0);
          acc.male.push(item.sex.male || 0);
          return acc;
        }, { female: [], male: [] });
        setGenderStats(gender);

        const statisticsResponse = await fetch('http://localhost:8080/dashboard/getcustomerstatistic');
        console.log("B Start")
        if (!statisticsResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const statisticsData = await statisticsResponse.json();
        setCustomerStatistics(statisticsData);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [dateType]);
  
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content" className="container-fluid">
        <div className="select-container">
          <label htmlFor="dateTypeSelect">Select Data Type: </label>
          <select id="dateTypeSelect" value={dateType} onChange={handleDateTypeChange}>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>
        <div className="dashboard-row">
          <AgeChart onFullScreen={handleFullScreen} fullScreenData={handleFullScreenData} ageStats={ageStats} dataType={dateType} dateLog={dateLog}/>
          <GenderChart onFullScreen={handleFullScreen} fullScreenData={handleFullScreenData} genderStats={genderStats} dataType={dateType} dateLog={dateLog}/>
          <RaceChart onFullScreen={handleFullScreen} fullScreenData={handleFullScreenData} raceStats={raceStats} dataType={dateType} dateLog={dateLog}/>
        </div>
        <div className="dashboard-row">
          <StatisticalData customerStatistics={customerStatistics}/>
          <TopSellerProduct onFullScreen={handleFullScreen} fullScreenData={handleFullScreenData}/>
          <TopSeller/>
        </div>
        <FullScreenChart fullScreenChart={fullScreenChart} onClose={handleCloseFullScreen} data={fullScreenData}/>
      </div>
    </div>
  );
}

export default Dashboard;

import React, { useState, useEffect } from "react";

const StatisticalData = ({ customerStatistics }) => {

  const genderStats = customerStatistics?.sex || {};
  const ageStats = customerStatistics?.age || {};
  const raceStats = customerStatistics?.race || {};

  return (
    <div className="dashboard-col">
      <div className="card shadow">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Statistical data</h6>
        </div>
        <div className="card-body">
          <div className="data-container">
            {/* Gender */}
            <div className="stat-section">
              <p className="stat-title">Gender:</p>
              <ul className="stat-list">
                <li className="stat-item">Male: <span>{genderStats.male || 'N/A'}</span></li>
                <li className="stat-item">Female: <span>{genderStats.female || 'N/A'}</span></li>
              </ul>
            </div>
            {/* Age */}
            <div className="stat-section">
              <p className="stat-title">Age:</p>
              <ul className="stat-list">
                {Object.entries(ageStats).map(([ageRange, percentage]) => (
                  <li key={ageRange} className="stat-item">{ageRange}: <span>{percentage}</span></li>
                ))}
              </ul>
            </div>
            {/* Race */}
            <div className="stat-section">
              <p className="stat-title">Race:</p>
              <ul className="stat-list">
                {Object.entries(raceStats).map(([race, percentage]) => (
                  <li key={race} className="stat-item">{race}: <span>{percentage}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticalData;

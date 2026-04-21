import React, { useState } from 'react';
import { useWeather } from '../../context/WeatherContext';
import '../../styles/components/RadarToolbar.css';

const RadarToolbar = () => {
  const [activeTab, setActiveTab] = useState('radar');
  const { weatherData } = useWeather();
  const lastUpdated = weatherData?.current?.last_updated || 'Just now';

  return (
    <div className="radar-toolbar">
      <div className="nav-center">
        <div className="live-ind"><span className="live-dot"></span> LIVE</div>
        <span>Global Radar · Updated {lastUpdated}</span>
      </div>
      <div className="nav-right">
        <button 
          className={`nav-icon-btn ${activeTab === 'radar' ? 'active' : ''}`} 
          onClick={() => setActiveTab('radar')}>📡 Radar
        </button>
        <button 
          className={`nav-icon-btn ${activeTab === 'wind' ? 'active' : ''}`} 
          onClick={() => setActiveTab('wind')}>💨 Wind
        </button>
        <button 
          className={`nav-icon-btn ${activeTab === 'temp' ? 'active' : ''}`} 
          onClick={() => setActiveTab('temp')}>🌡 Temp
        </button>
        <button 
          className={`nav-icon-btn ${activeTab === 'storms' ? 'active' : ''}`} 
          onClick={() => setActiveTab('storms')}>⛈ Storms
        </button>
      </div>
    </div>
  );
};

export default RadarToolbar;

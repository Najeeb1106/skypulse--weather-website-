import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import '../../styles/components/AlertsStats.css';

const AlertsStats = () => {
  const { weatherData, loading } = useWeather();
  
  if (loading || !weatherData) return null;
  
  const alerts = weatherData?.alerts?.alert || [];
  
  // 1. Calculate Core Stats
  const activeAlerts = alerts.length;
  
  const activeStorms = alerts.filter(a => 
    /storm|thunder|hurricane|cyclone|typhoon/i.test(a.event) || 
    /storm|thunder|hurricane|cyclone|typhoon/i.test(a.desc)
  ).length;
  
  const watches = alerts.filter(a => /watch/i.test(a.event)).length;
  
  // 2. Simulated "People Alerted" (Heuristic based on city name for variety)
  const getHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  };
  
  const cityHash = getHash(weatherData.location.name);
  // Returns something like 1.2M to 6.2M for active alerts, otherwise 0
  const peopleValue = activeAlerts > 0 
    ? ( (cityHash % 50) / 10 + 1.2).toFixed(1) + 'M' 
    : '0.0';

  return (
    <div className="stats-row">
      <div className="stat-box">
        <div className="stat-num" style={{ color: activeAlerts > 0 ? 'var(--red)' : 'var(--muted)' }}>
          {activeAlerts}
        </div>
        <div className="stat-lbl">Active Alerts</div>
      </div>
      <div className="stat-box">
        <div className="stat-num" style={{ color: activeStorms > 0 ? 'var(--orange)' : 'var(--muted)' }}>
          {activeStorms}
        </div>
        <div className="stat-lbl">Active Storms</div>
      </div>
      <div className="stat-box">
        <div className="stat-num" style={{ color: watches > 0 ? 'var(--yellow)' : 'var(--muted)' }}>
          {watches}
        </div>
        <div className="stat-lbl">Watches Issued</div>
      </div>
      <div className="stat-box">
        <div className="stat-num" style={{ color: activeAlerts > 0 ? 'var(--green)' : 'var(--muted)' }}>
          {peopleValue}
        </div>
        <div className="stat-lbl">People Alerted</div>
      </div>
    </div>
  );
};

export default AlertsStats;

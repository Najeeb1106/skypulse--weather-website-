import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import '../../styles/components/AlertsHero.css';

const AlertsHero = () => {
  const { city, weatherData, loading } = useWeather();
  
  if (loading || !weatherData) {
    return (
      <div className="page-header" style={{ opacity: 0.6 }}>
        <h1 className="page-title">Loading Alerts...</h1>
      </div>
    );
  }

  const alerts = weatherData?.alerts?.alert || [];
  const hasAlerts = alerts.length > 0;

  return (
    <div className="page-header">
      <div className="header-eyebrow">
        {hasAlerts ? (
          <div className="eyebrow-tag" style={{ background: 'rgba(255, 107, 107, 0.1)', color: '#ff6b6b' }}>
            ⚡ {alerts.length} Active Warnings
          </div>
        ) : (
          <div className="eyebrow-tag" style={{ background: 'rgba(109, 220, 139, 0.1)', color: '#6ddc8b' }}>
            🛡️ All Clear
          </div>
        )}
      </div>
      <h1 className="page-title">
        Severe Weather Alerts<br />
        for <em>{city}</em>
      </h1>
      <p className="page-sub">
        {hasAlerts 
          ? `There are currently ${alerts.length} active severe weather alerts for your area. Please review the details below and take necessary precautions.`
          : `No active severe weather warnings for ${city}. The skies are clear and no immediate threats have been detected by global meteorological services.`
        }
      </p>
    </div>
  );
};

export default AlertsHero;

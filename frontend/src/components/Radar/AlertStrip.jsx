import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import '../../styles/components/AlertStrip.css';

const AlertStrip = () => {
  const { weatherData } = useWeather();
  const alerts = weatherData?.alerts?.alert || [];

  if (alerts.length === 0) return null;

  const firstAlert = alerts[0];

  const getSeverityClass = (severity) => {
    const s = severity.toLowerCase();
    if (s.includes('extreme') || s.includes('warning')) return 'warn'; // Matches existing CSS 'warn'
    if (s.includes('severe') || s.includes('watch')) return 'watch'; // Matches existing CSS 'watch'
    return '';
  };

  return (
    <div className="alert-strip">
      <div className={`storm-chip ${getSeverityClass(firstAlert.severity)}`}>
        <span className="chip-icon">⚠️</span>
        <div className="chip-content">
          <div className="chip-title">{firstAlert.event}</div>
          <div className="chip-loc">Until {firstAlert.expires}</div>
        </div>
      </div>
    </div>
  );
};

export default AlertStrip;

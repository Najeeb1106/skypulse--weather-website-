import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import '../../styles/components/AlertsGrid.css';

const AlertsGrid = ({ activeFilter }) => {
  const { city, weatherData, loading } = useWeather();

  if (loading || !weatherData) return null;

  let alerts = weatherData?.alerts?.alert || [];

  // Filter logic
  if (activeFilter !== 'All') {
    alerts = alerts.filter(alert => 
      alert.severity.toLowerCase().includes(activeFilter.toLowerCase()) ||
      alert.event.toLowerCase().includes(activeFilter.toLowerCase())
    );
  }

  // 1. Beautiful Empty State Handling
  if (alerts.length === 0) {
    return (
      <div className="alerts-empty">
        <div className="empty-icon-wrap">🛡️</div>
        <div className="empty-title">All Clear in {city}</div>
        <div className="empty-sub">
          There are currently no active severe weather warnings for this location. We're monitoring 24/7.
        </div>
      </div>
    );
  }

  // 2. Helper for Severity Colors/Tags
  const getSeverityData = (severity) => {
    const s = severity.toLowerCase();
    if (s.includes('extreme') || s.includes('warning')) {
      return { 
        class: 'alert-extreme', 
        tagClass: 'tag-extreme', 
        tagName: '🔴 Extreme',
        btnClass: 'btn-primary-red',
        icon: '⚠️'
      };
    }
    if (s.includes('severe') || s.includes('watch')) {
      return { 
        class: 'alert-severe', 
        tagClass: 'tag-severe', 
        tagName: '🟠 Severe',
        btnClass: 'btn-primary-orange',
        icon: '⛈️'
      };
    }
    return { 
      class: 'alert-warning', 
      tagClass: 'tag-warning', 
      tagName: '🟡 Advisory',
      btnClass: 'btn-primary-yellow',
      icon: '🌦️'
    };
  };

  const truncateDesc = (text, length = 180) => {
    if (!text) return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <div className="alerts-grid">
      {alerts.map((alert, idx) => {
        const sData = getSeverityData(alert.severity);
        return (
          <div key={idx} className={`alert-card ${sData.class}`} style={{ '--i': idx }}>
            <div className="card-top">
              <span className="card-icon-wrap">{sData.icon}</span>
              <span className={`severity-tag ${sData.tagClass}`}>{sData.tagName}</span>
            </div>
            <div className="card-title">{alert.event}</div>
            <div className="card-region">📍 {city} Area</div>
            <div className="card-desc">{truncateDesc(alert.desc)}</div>
            <div className="card-meta">
              <div className="card-time">⏱ Expires: {alert.expires}</div>
              <div className="card-actions">
                <button className="card-btn btn-secondary">Full Details</button>
                <button className={`card-btn ${sData.btnClass}`}>Stay Alert</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AlertsGrid;

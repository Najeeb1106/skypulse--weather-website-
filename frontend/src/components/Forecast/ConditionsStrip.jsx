import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import '../../styles/components/ConditionsStrip.css';

const ConditionsStrip = () => {
  const { weatherData, loading } = useWeather();

  if (loading || !weatherData) {
    return (
      <div className="conditions-strip" style={{ opacity: 0.6 }}>
        <p>Loading conditions...</p>
      </div>
    );
  }

  const { current } = weatherData;

  const getAqiText = (index) => {
    const levels = {
      1: 'Good',
      2: 'Moderate',
      3: 'Unhealthy for Sensitive Groups',
      4: 'Unhealthy',
      5: 'Very Unhealthy',
      6: 'Hazardous'
    };
    return levels[index] || 'Unknown';
  };

  const conditionsData = [
    { icon: '💧', value: `${current.humidity}%`, label: 'Humidity' },
    { icon: '💨', value: `${current.wind_kph} km/h ${current.wind_dir}`, label: 'Wind' },
    { icon: '☀️', value: `${current.uv} Index`, label: 'UV Index' },
    { icon: '👁️', value: `${current.vis_km} km`, label: 'Visibility' },
    { icon: '🌡️', value: `${current.pressure_mb} hPa`, label: 'Pressure' },
    { icon: '🌿', value: `${current.air_quality?.['us-epa-index'] || '-'} ${getAqiText(current.air_quality?.['us-epa-index'])}`, label: 'AQI' },
  ];

  return (
    <div className="conditions-strip">
      {conditionsData.map((cond, index) => (
        <div key={index} className="cond-card">
          <span className="cond-icon">{cond.icon}</span>
          <div className="cond-value">{cond.value}</div>
          <div className="cond-label">{cond.label}</div>
        </div>
      ))}
    </div>
  );
};

export default ConditionsStrip;

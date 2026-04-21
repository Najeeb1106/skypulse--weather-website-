import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import '../../styles/components/AqiCompare.css';

const AqiCompare = () => {
  const { city, weatherData, loading } = useWeather();

  if (loading || !weatherData) return null;

  const currentAqiIdx = weatherData?.current?.air_quality?.['us-epa-index'] || 1;
  const currentAqiScore = [25, 75, 125, 175, 250, 400][currentAqiIdx - 1] || 25;
  
  const getSeverity = (score) => {
    if (score <= 50) return { color: 'var(--green)', class: 'status-good', text: 'Good' };
    if (score <= 100) return { color: 'var(--yellow)', class: 'status-mod', text: 'Moderate' };
    return { color: 'var(--red)', class: 'status-unhealthy', text: 'Poor' };
  };

  const currentSev = getSeverity(currentAqiScore);

  const compareData = [
    { city: city, country: weatherData.location.country, aqi: currentAqiScore, aqiColor: currentSev.color, statusClass: currentSev.class, statusText: currentSev.text, isHighlight: true },
    { city: 'New York', country: '🇺🇸 USA', aqi: '42', aqiColor: 'var(--green)', statusClass: 'status-good', statusText: 'Good', isHighlight: false },
    { city: 'Delhi', country: '🇮🇳 India', aqi: '178', aqiColor: 'var(--red)', statusClass: 'status-unhealthy', statusText: 'Unhealthy', isHighlight: false },
    { city: 'Sydney', country: '🇦🇺 Australia', aqi: '28', aqiColor: 'var(--green)', statusClass: 'status-good', statusText: 'Good', isHighlight: false }
  ];

  return (
    <div className="compare-section">
      <div className="section-title">🌍 How Does Your City Compare Right Now?</div>
      <div className="aqi-compare-grid">
        {compareData.map((data, idx) => (
          <div key={idx} className={`compare-card ${data.isHighlight ? 'highlight' : ''}`}>
            <div className="comp-city">{data.city}</div>
            <div className="comp-country">{data.country}</div>
            <div className="comp-aqi" style={{ color: data.aqiColor }}>{data.aqi}</div>
            <span className={`comp-badge ${data.statusClass}`}>{data.statusText}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AqiCompare;

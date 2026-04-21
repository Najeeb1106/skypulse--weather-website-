import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import '../../styles/components/PollutantsGrid.css';

const PollutantsGrid = () => {
  const { weatherData, loading } = useWeather();

  if (loading || !weatherData) return null;

  const aqiData = weatherData.current.air_quality;

  const formatVal = (val) => Math.round(val * 10) / 10;

  const getStatus = (val, thresholds) => {
    if (val <= thresholds[0]) return { class: 'status-good', text: 'Good', color: 'var(--green)' };
    if (val <= thresholds[1]) return { class: 'status-mod', text: 'Moderate', color: 'var(--yellow)' };
    return { class: 'status-poor', text: 'Poor', color: 'var(--red)' };
  };

  const pollutants = [
    { 
      name: 'Fine Particles', 
      chemical: 'PM₂.₅', 
      value: formatVal(aqiData.pm2_5), 
      unit: 'µg/m³', 
      max: 50, 
      thresholds: [12, 35],
      gradient: 'linear-gradient(90deg,#6ddc8b,#a0e8b0)'
    },
    { 
      name: 'Coarse Particles', 
      chemical: 'PM₁₀', 
      value: formatVal(aqiData.pm10), 
      unit: 'µg/m³', 
      max: 100, 
      thresholds: [54, 154],
      gradient: 'linear-gradient(90deg,#6ddc8b,#c0e850)'
    },
    { 
      name: 'Nitrogen Dioxide', 
      chemical: 'NO₂', 
      value: formatVal(aqiData.no2), 
      unit: 'µg/m³', 
      max: 200, 
      thresholds: [53, 100],
      gradient: 'linear-gradient(90deg,#ffd166,#ffe060)'
    },
    { 
      name: 'Ozone', 
      chemical: 'O₃', 
      value: formatVal(aqiData.o3), 
      unit: 'µg/m³', 
      max: 180, 
      thresholds: [70, 160],
      gradient: 'linear-gradient(90deg,#6ddc8b,#80ffa0)'
    },
    { 
      name: 'Sulfur Dioxide', 
      chemical: 'SO₂', 
      value: formatVal(aqiData.so2), 
      unit: 'µg/m³', 
      max: 350, 
      thresholds: [75, 185],
      gradient: 'linear-gradient(90deg,#6ddc8b,#a0ffd0)'
    },
    { 
      name: 'Carbon Monoxide', 
      chemical: 'CO', 
      value: formatVal(aqiData.co / 1000), // Convert ug/m3 to mg/m3
      unit: 'mg/m³', 
      max: 15, 
      thresholds: [4.4, 9.4],
      gradient: 'linear-gradient(90deg,#6ddc8b,#b0eecc)'
    }
  ];

  const pollutantsData = pollutants.map(p => {
    const status = getStatus(p.value, p.thresholds);
    return {
      ...p,
      width: `${Math.min((p.value / p.max) * 100, 100)}%`,
      statusClass: status.class,
      statusText: status.text,
      valueColor: status.color
    };
  });

  return (
    <div className="pollutants-section">
      <div className="section-title">🔬 Pollutant Breakdown</div>
      <div className="poll-grid">
        {pollutantsData.map((pollutant, idx) => (
          <div key={idx} className="poll-card">
            <div className="poll-name">{pollutant.name}</div>
            <div className="poll-chemical">{pollutant.chemical}</div>
            <div className="poll-bar-track">
              <div 
                className="poll-bar-fill" 
                style={{ width: pollutant.width, background: pollutant.gradient }}
              ></div>
            </div>
            <div className="poll-value">
              <div>
                <div className="poll-num" style={{ color: pollutant.valueColor }}>{pollutant.value}</div>
                <div className="poll-unit">{pollutant.unit}</div>
              </div>
              <span className={`poll-status ${pollutant.statusClass}`}>{pollutant.statusText}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PollutantsGrid;

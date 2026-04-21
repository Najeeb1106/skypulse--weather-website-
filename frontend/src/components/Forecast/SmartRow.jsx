import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import '../../styles/components/SmartRow.css';

const SmartRow = () => {
  const { weatherData, loading } = useWeather();

  if (loading || !weatherData) return null;

  const { current, forecast } = weatherData;
  const astro = forecast.forecastday[0].astro;
  
  const tempDiff = Math.round(current.feelslike_c - current.temp_c);
  let feelsNote = "The temperature feels the same as it is.";
  if (tempDiff > 0) {
    feelsNote = `It feels ${tempDiff}° warmer than it actually is, likely due to humidity.`;
  } else if (tempDiff < 0) {
    feelsNote = `It feels ${Math.abs(tempDiff)}° cooler than it actually is, likely due to wind chill.`;
  }

  const astroData = [
    { icon: '🌅', label: 'Sunrise', value: astro.sunrise },
    { icon: '🌇', label: 'Sunset', value: astro.sunset },
    { icon: '🌔', label: 'Moon Phase', value: astro.moon_phase },
  ];

  return (
    <div className="smart-row">
      <div className="feels-card">
        <div className="feels-label">Feels Like</div>
        <div className="feels-val">{Math.round(current.feelslike_c)}°C</div>
        <div className="feels-note">{feelsNote}</div>
      </div>
      <div className="smart-tip">
        <div className="tip-header">
          <h3>✨ Sun & Moon Overview</h3>
          <span className="tip-badge">Astro Data</span>
        </div>
        {astroData.map((item, index) => (
          <div key={index} className="tip-row">
            <span className="tip-icon">{item.icon}</span>
            <div className="tip-time" style={{ minWidth: '110px' }}>{item.label}</div>
            <div className="tip-text" style={{ fontWeight: 600, color: 'var(--text)' }}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartRow;

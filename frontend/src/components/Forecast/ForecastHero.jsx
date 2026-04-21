import React from 'react';
import { useWeather } from '../../context/WeatherContext'; // 1. Import the global brain
import '../../styles/components/ForecastHero.css';

const ForecastHero = () => {
  // 2. Extract the globally active city and live data states
  const { city, weatherData, loading, error } = useWeather();

  if (loading) {
    return (
      <div className="forecast-hero">
        <div style={{ padding: '2rem' }}>Loading live data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="forecast-hero">
        <div style={{ padding: '2rem', color: '#ff6b6b' }}>Error: {error}</div>
      </div>
    );
  }

  if (!weatherData) return null;

  return (
    <div className="forecast-hero">
      <div>
        <div className="location-meta">
          <span className="loc-pin">📍</span> {weatherData.location.region}, {weatherData.location.country}
        </div>
        
        {/* 3. Inject the dynamic city right here! */}
        <h1 className="location-name">{city}</h1>
        
        <div className="location-sub">Local time {weatherData.location.localtime}</div>
        <div className="update-badge">
          <span className="upd-dot"></span> Updated just now
        </div>
      </div>
      <div className="temp-display">
        <div className="temp-big">{Math.round(weatherData.current.temp_c)}°</div>
        <div className="temp-condition">
          <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} width="40" height="40" style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          {weatherData.current.condition.text}
        </div>
        <div className="temp-range">
          H: <strong>{Math.round(weatherData.forecast.forecastday[0].day.maxtemp_c)}°</strong> &nbsp;·&nbsp; L: <strong>{Math.round(weatherData.forecast.forecastday[0].day.mintemp_c)}°</strong>
        </div>
      </div>
    </div>
  );
};

export default ForecastHero;
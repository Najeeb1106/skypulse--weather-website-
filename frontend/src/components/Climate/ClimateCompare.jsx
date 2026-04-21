import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import '../../styles/components/ClimateCompare.css';

const ClimateCompare = () => {
  const { city, weatherData, loading } = useWeather();

  const currentTemp = weatherData ? Math.round(weatherData.current.temp_c) : '--';
  const currentCondition = weatherData ? weatherData.current.condition.text : 'Loading...';

  return (
    <div className="compare-tool">
      <div className="compare-header-title">⚖️ Global Climate Comparison</div>
      <div className="compare-sub">Compare {city} against global destinations.</div>
      
      <div className="climate-compare-grid">
        {/* Dynamic Card - Live City */}
        <div className="city-compare-card active-city-card">
          <div className="cc-city">📍 {city}</div>
          <div className="cc-status-row">
            <span className="cc-live-temp">{currentTemp}°C</span>
            <span className="cc-live-cond">{currentCondition}</span>
          </div>
          <div className="cc-row">
            <span className="cc-label">Season</span>
            <span className="cc-val">Current</span>
          </div>
          <div className="cc-row">
            <span className="cc-label">Humidity</span>
            <span className="cc-val">{weatherData?.current?.humidity || '--'}%</span>
          </div>
        </div>

        {/* Static Card - London */}
        <div className="city-compare-card">
          <div className="cc-city">🇬🇧 London, UK</div>
          <div className="cc-row"><span className="cc-label">Summer High</span><span className="cc-val">23°C</span></div>
          <div className="cc-row"><span className="cc-label">Winter Low</span><span className="cc-val">2°C</span></div>
          <div className="cc-row"><span className="cc-label">Rainy Days</span><span className="cc-val">109 days</span></div>
        </div>

        {/* Static Card - Delhi */}
        <div className="city-compare-card">
          <div className="cc-city">🇮🇳 Delhi, India</div>
          <div className="cc-row"><span className="cc-label">Summer High</span><span className="cc-val">40°C</span></div>
          <div className="cc-row"><span className="cc-label">Winter Low</span><span className="cc-val">8°C</span></div>
          <div className="cc-row"><span className="cc-label">Monsoon</span><span className="cc-val">Jul - Sep</span></div>
        </div>
      </div>
    </div>
  );
};

export default ClimateCompare;

import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import '../../styles/components/ClimateHero.css';

const ClimateHero = () => {
  const { city, weatherData } = useWeather();
  const region = weatherData?.location?.region || '';
  const country = weatherData?.location?.country || '';

  return (
    <div className="page-header">
      <div className="eyebrow">📊 Climate & History</div>
      <h1 className="page-title">{city}, {country}<br/>Climate Guide</h1>
      <p className="page-sub">
        Based on historical averages for {region ? `${region}, ` : ''}{country}. 
        Monthly trends, records, and travel recommendations for your journey.
      </p>
    </div>
  );
};

export default ClimateHero;

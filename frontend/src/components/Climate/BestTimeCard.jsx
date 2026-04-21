import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import '../../styles/components/BestTimeCard.css';

const BestTimeCard = () => {
  const { city } = useWeather();

  return (
    <div className="best-time-card">
      <div>
        <div className="bt-label">✈️ Best Time to Visit</div>
        <div className="bt-city">{city}</div>
        <p className="bt-text">Visit in late spring or early fall for the most comfortable temperatures and pleasant outdoor conditions. Check local event calendars for seasonal highlights.</p>
      </div>
      <div>
        <div className="bt-peak-label">Peak Months</div>
        <div className="bt-months">
          <div className="bt-month">May</div>
          <div className="bt-month peak">Jun</div>
          <div className="bt-month">Sep</div>
          <div className="bt-month peak">Oct</div>
        </div>
      </div>
    </div>
  );
};

export default BestTimeCard;

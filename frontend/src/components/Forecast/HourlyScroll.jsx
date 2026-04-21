import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import '../../styles/components/HourlyScroll.css';

const HourlyScroll = () => {
  const { weatherData, loading } = useWeather();

  if (loading || !weatherData) return null;

  const nowEpoch = Math.floor(Date.now() / 1000);
  
  // Combine today and tomorrow's hours for a rolling 24h view
  const allHours = [
    ...weatherData.forecast.forecastday[0].hour,
    ...weatherData.forecast.forecastday[1].hour
  ];

  // Filter for future hours and take the next 24
  const futureHours = allHours
    .filter(hour => hour.time_epoch >= nowEpoch - 1800) // Keep current hour (buffer 30m)
    .slice(0, 24);

  const formatTime = (timeStr) => {
    const hour = parseInt(timeStr.split(' ')[1].split(':')[0]);
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    return hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
  };

  return (
    <div className="hourly-section">
      <div className="section-title">⏱ Hourly Forecast — Next 24 Hours</div>
      <div className="hourly-scroll">
        <div className="hourly-inner">
          {futureHours.map((hour, index) => {
            const isNow = index === 0;
            return (
              <div key={hour.time_epoch} className={`hour-card ${isNow ? 'now' : ''}`}>
                <div className={`hour-time ${isNow ? 'now-label' : ''}`}>
                  {isNow ? 'Now' : formatTime(hour.time)}
                </div>
                <div className="hour-icon">
                  <img src={hour.condition.icon} alt={hour.condition.text} width="32" height="32" />
                </div>
                <div className="hour-temp">{Math.round(hour.temp_c)}°</div>
                <div className="hour-rain">{hour.chance_of_rain}%</div>
                <div className="rain-bar-wrap">
                  <div className="rain-bar" style={{ width: `${hour.chance_of_rain}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HourlyScroll;

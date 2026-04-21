import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import '../../styles/components/TenDayForecast.css';

const TenDayForecast = () => {
  const { weatherData, loading } = useWeather();

  if (loading || !weatherData || !weatherData.forecast) return null;

  const forecastDays = weatherData.forecast.forecastday;

  // Find absolute min and max temps across the 10 days for the bar sizing
  const allMins = forecastDays.map(d => d.day.mintemp_c);
  const allMaxs = forecastDays.map(d => d.day.maxtemp_c);
  const absMin = Math.min(...allMins);
  const absMax = Math.max(...allMaxs);
  const totalRange = absMax - absMin;

  const getDayName = (dateStr, index) => {
    if (index === 0) return 'Today';
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
  };

  return (
    <div className="tenday-section" id="10-day">
      <div className="section-title">📅 10-Day Forecast</div>
      {forecastDays.map((day, ix) => {
        const min = day.day.mintemp_c;
        const max = day.day.maxtemp_c;
        
        // Calculate relative position and width for the temp bar
        const ml = totalRange === 0 ? 0 : ((min - absMin) / totalRange) * 100;
        const width = totalRange === 0 ? 100 : ((max - min) / totalRange) * 100;

        return (
          <div className="day-row" key={day.date_epoch}>
            <span className="day-name">{getDayName(day.date, ix)}</span>
            <span className="day-icon">
              <img src={day.day.condition.icon} alt={day.day.condition.text} width="28" height="28" />
            </span>
            <span className="day-cond">{day.day.condition.text}</span>
            <span className="day-rain-pct">
              {day.day.daily_chance_of_rain > 0 && (
                <>💧 {day.day.daily_chance_of_rain}%</>
              )}
            </span>
            <div className="day-temps">
              <span className="day-lo">{Math.round(min)}°</span>
              <div className="temp-bar-track">
                <div 
                  className="temp-bar-fill" 
                  style={{ 
                    marginLeft: `${ml}%`, 
                    width: `${width}%` 
                  }}
                ></div>
              </div>
              <span className="day-hi">{Math.round(max)}°</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TenDayForecast;

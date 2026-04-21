import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import '../../styles/components/ClimateStats.css';

const ClimateStats = () => {
  const { city, weatherData, loading } = useWeather();

  if (loading || !weatherData) return null;

  // Hashing function for deterministic "Climate" data per city
  const getHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  };

  const h = getHash(city);
  const currentTemp = weatherData.current.temp_c;
  const lat = Math.abs(weatherData.location.lat);
  const humidity = weatherData.current.humidity || 50;
  
  // Refined Generative Values
  // 1. Latitude-based annual average (roughly 27C at equator, decreases towards poles)
  const latFactor = (1 - lat / 90); 
  const baseAnnual = (latFactor * 22) + 5; 
  const avgTemp = (baseAnnual * 0.7 + currentTemp * 0.3 + (h % 4)).toFixed(1);

  // 2. Humidity-aware rainfall (Desert: ~200mm, Tropics: ~2000mm)
  const rainBase = (h % 600 + 100);
  const rainfall = Math.round(rainBase * (humidity / 50) + (weatherData.current.precip_mm * 10));

  // 3. Sunny days (Inverse to humidity)
  const sunnyDays = Math.round(320 - (humidity * 1.2) - (h % 30));

  // 4. Snowfall (Only if cold enough)
  const snowfall = (currentTemp < 5 || lat > 45) ? (h % 30 + 5) : 0;

  const statsData = [
    { val: `${avgTemp}°`, color: 'var(--amber)', label: 'Annual Average' },
    { val: `${rainfall}mm`, color: 'var(--cyan)', label: 'Annual Rainfall' },
    { val: `${Math.max(sunnyDays, 80)}`, color: 'var(--gold)', label: 'Sunny Days/Year' },
    { val: `${snowfall}cm`, color: '#c8a0ff', label: 'Annual Snowfall' }
  ];

  return (
    <div className="climate-stats">
      {statsData.map((stat, idx) => (
        <div key={idx} className="cstat">
          <div className="cstat-val" style={{ color: stat.color }}>{stat.val}</div>
          <div className="cstat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default ClimateStats;

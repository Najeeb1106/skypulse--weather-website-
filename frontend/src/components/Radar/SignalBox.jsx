import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import '../../styles/components/SignalBox.css';

const SignalBox = () => {
  const { city, weatherData } = useWeather();
  
  if (!weatherData) return null;

  const { lat, lon } = weatherData.location;
  const { wind_kph, wind_dir } = weatherData.current;

  return (
    <div className="signal-box">
      <span className="sig-dot"></span>
      <strong>{city}</strong> &nbsp;·&nbsp; 
      Lat: {lat.toFixed(2)}, Lon: {lon.toFixed(2)} &nbsp;·&nbsp; 
      Radar Active &nbsp;·&nbsp; 
      Wind: {wind_kph} km/h {wind_dir}
    </div>
  );
};

export default SignalBox;

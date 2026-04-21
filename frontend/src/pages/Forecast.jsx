import React from 'react';
import '../styles/components/Forecast.css'; 

import RainBackground from '../components/Forecast/RainBackground';
import ForecastHero from '../components/Forecast/ForecastHero';
import ConditionsStrip from '../components/Forecast/ConditionsStrip';
import SmartRow from '../components/Forecast/SmartRow';
import HourlyScroll from '../components/Forecast/HourlyScroll';
import TenDayForecast from '../components/Forecast/TenDayForecast';
import AstroRow from '../components/Forecast/AstroRow';
import RadarMini from '../components/Forecast/RadarMini';
import SaveLocation from '../components/Forecast/SaveLocation';

const Forecast = () => {
  return (
    <>
      <RainBackground />
      
      <div className="forecast-page">
        <ForecastHero />
        <ConditionsStrip />
        <SmartRow />
        <HourlyScroll />
        <TenDayForecast />
        <AstroRow />
        
        <div className="bottom-row">
          <RadarMini />
          <SaveLocation />
        </div>
      </div>
    </>
  );
};

export default Forecast;
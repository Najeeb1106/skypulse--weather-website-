import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import '../../styles/components/ClimateDownload.css';

const ClimateDownload = () => {
  const { city } = useWeather();
  
  return (
    <div className="download-cta">
      <div>
        <div className="dl-title">📥 Download the {city} Climate Report</div>
        <p className="dl-desc">Get the full PDF — monthly breakdowns, travel guide, historical charts, and 5-year trend analysis. Free download.</p>
        <div className="dl-perks">
          <div className="perk">Monthly averages for all 12 months</div>
          <div className="perk">30-year historical trend charts</div>
          <div className="perk">Travel recommendation guide</div>
          <div className="perk">Record highs, lows, and extremes</div>
        </div>
      </div>
      <div className="dl-form">
        <input className="dl-input" type="email" placeholder="your@email.com"/>
        <button className="dl-btn">📄 Download Free Report</button>
        <div className="pro-upsell">Need bulk data or multiple cities? <a href="#">SkyPulse Pro →</a></div>
      </div>
    </div>
  );
};

export default ClimateDownload;

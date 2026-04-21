import React from 'react';
import '../styles/components/AirQuality.css'; 

import AqiHero from '../components/AirQuality/AqiHero';
import PollutantsGrid from '../components/AirQuality/PollutantsGrid';
import AqiChart from '../components/AirQuality/AqiChart';
import AqiCompare from '../components/AirQuality/AqiCompare';
import AqiNewsletter from '../components/AirQuality/AqiNewsletter';

const AirQuality = () => {
  return (
    <div className="aqi-page">
      <AqiHero />
      <PollutantsGrid />
      <AqiChart />
      <AqiCompare />
      <AqiNewsletter />
    </div>
  );
};

export default AirQuality;
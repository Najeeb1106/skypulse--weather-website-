import React from 'react';
import '../styles/components/Climate.css'; 

import ClimateHero from '../components/Climate/ClimateHero';
import BestTimeCard from '../components/Climate/BestTimeCard';
import MonthlyChart from '../components/Climate/MonthlyChart';
import ClimateStats from '../components/Climate/ClimateStats';
import ClimateCompare from '../components/Climate/ClimateCompare';
import ClimateRecords from '../components/Climate/ClimateRecords';
import ClimateDownload from '../components/Climate/ClimateDownload';

const Climate = () => {
  return (
    <div className="climate-page">
      <ClimateHero />
      <BestTimeCard />
      <MonthlyChart />
      <ClimateStats />
      <ClimateCompare />
      <ClimateRecords />
      <ClimateDownload />
    </div>
  );
};

export default Climate;
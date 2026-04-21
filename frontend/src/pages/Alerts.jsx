import React, { useState } from 'react';
import '../styles/components/Alerts.css'; 

import AlertsHero from '../components/Alerts/AlertsHero';
import AlertsStats from '../components/Alerts/AlertsStats';
import AlertsFilter from '../components/Alerts/AlertsFilter';
import AlertsGrid from '../components/Alerts/AlertsGrid';
import AlertsSubscribe from '../components/Alerts/AlertsSubscribe';

const Alerts = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="alerts-page">
      <AlertsHero />
      <AlertsStats />
      <AlertsFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      <AlertsGrid activeFilter={activeFilter} />
      <AlertsSubscribe />
    </div>
  );
};

export default Alerts;
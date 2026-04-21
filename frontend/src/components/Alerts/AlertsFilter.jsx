import React from 'react';
import '../../styles/components/AlertsFilter.css';

const AlertsFilter = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { name: 'All', class: '' },
    { name: 'Extreme', class: 'active-red', emoji: '🔴' },
    { name: 'Severe', class: 'active-orange', emoji: '🟠' },
    { name: 'Warning', class: 'active-yellow', emoji: '🟡' },
    { name: 'Watch', class: 'active-blue', emoji: '🔵' },
  ];

  return (
    <div className="filter-bar">
      <span className="filter-label">Filter:</span>
      {filters.map((f) => (
        <span 
          key={f.name}
          className={`filter-chip ${activeFilter === f.name ? (f.class || 'active-default') : ''}`}
          onClick={() => setActiveFilter(f.name)}
        >
          {f.emoji} {f.name}
        </span>
      ))}
    </div>
  );
};

export default AlertsFilter;

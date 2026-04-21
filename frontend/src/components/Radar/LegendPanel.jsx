import React from 'react';
import '../../styles/components/LegendPanel.css';

const LegendPanel = () => {
  return (
    <div className="legend-panel">
      <div className="legend-title">Precipitation Intensity</div>
      <div className="legend-scale"></div>
      <div className="legend-labels">
        <span>None</span>
        <span>Light</span>
        <span>Moderate</span>
        <span>Heavy</span>
        <span>Extreme</span>
      </div>
    </div>
  );
};

export default LegendPanel;

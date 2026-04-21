import React, { useState } from 'react';
import '../../styles/components/TimelineBar.css';

const ticks = [
  { id: 0, label: '-3h', color: 'rgba(0,212,255,0.2)' },
  { id: 1, label: '-2h', color: null },
  { id: 2, label: '-1h', color: null },
  { id: 3, label: 'NOW', color: null },
  { id: 4, label: '+1h', color: 'rgba(255,209,102,0.3)' },
  { id: 5, label: '+2h', color: 'rgba(255,209,102,0.3)' },
  { id: 6, label: '+3h', color: 'rgba(255,209,102,0.3)' },
  { id: 7, label: '+6h', color: 'rgba(255,209,102,0.3)' },
];

const TimelineBar = () => {
  const [activeTick, setActiveTick] = useState(3);

  return (
    <div className="timeline-bar">
      {ticks.map((tick) => (
        <div 
          key={tick.id} 
          className={`tl-tick ${activeTick === tick.id ? 'active' : ''}`}
          onClick={() => setActiveTick(tick.id)}
        >
          <div className="tl-bar" style={tick.color ? { background: tick.color } : {}}></div>
          <div className="tl-time">{tick.label}</div>
        </div>
      ))}
    </div>
  );
};

export default TimelineBar;

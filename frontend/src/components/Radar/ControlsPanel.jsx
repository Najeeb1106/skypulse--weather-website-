import React, { useState } from 'react';
import '../../styles/components/ControlsPanel.css';

const ControlsPanel = () => {
  const [timeValue, setTimeValue] = useState(12);
  const times = ['-3:00','-2:30','-2:00','-1:30','-1:00','-0:30','NOW','+0:30','+1:00','+1:30','+2:00','+2:30','NOW','+1h','+2h','+3h','+4h','+5h','+6h'];

  return (
    <div className="controls-panel">
      <div className="panel-title">Navigation</div>
      <div className="zoom-btns">
        <button className="zoom-btn">＋</button>
        <button className="zoom-btn">－</button>
        <button className="zoom-btn">⊕</button>
      </div>
      <div className="time-control">
        <div className="time-label">Time Playback</div>
        <input 
          type="range" 
          className="time-slider" 
          id="timeSlider" 
          min="0" max="18" 
          value={timeValue}
          onChange={(e) => setTimeValue(e.target.value)}
        />
        <div className="time-display" id="timeDisplay">{times[timeValue] || 'NOW'}</div>
        <div className="time-buttons">
          <button className="time-btn">−3h</button>
          <button className="time-btn active">▶ Play</button>
          <button className="time-btn">+6h</button>
        </div>
      </div>
      
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '14px 0' }}></div>
      <div className="panel-title">Opacity</div>
      <input type="range" className="time-slider" min="10" max="100" defaultValue="75" style={{ marginTop: '6px' }}/>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: 'var(--muted)', marginTop: '4px' }}>
        <span>Faint</span><span>Full</span>
      </div>
    </div>
  );
};

export default ControlsPanel;

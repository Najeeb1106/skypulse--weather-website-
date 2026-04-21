import React, { useState } from 'react';
import '../../styles/components/LayersPanel.css';

const layers = [
  { id: 'precip', color: '#00d4ff', icon: '🌧', label: 'Precipitation' },
  { id: 'wind',   color: '#7ee8fa', icon: '💨', label: 'Wind Speed' },
  { id: 'temp',   color: '#ffd166', icon: '🌡', label: 'Temperature' },
  { id: 'cloud',  color: '#c8c8ff', icon: '☁️', label: 'Cloud Cover' },
  { id: 'humid',  color: '#80ffb0', icon: '💧', label: 'Humidity' },
  { id: 'press',  color: '#ff9a3c', icon: '🔵', label: 'Pressure' },
  { id: 'storm',  color: '#ff6b35', icon: '⛈', label: 'Storm Tracks', glow: true },
];

const LayersPanel = () => {
  const [activeLayer, setActiveLayer] = useState('precip');

  return (
    <div className="layers-panel">
      <div className="panel-title">Map Layers</div>
      {layers.map(layer => (
        <button 
          key={layer.id}
          className={`layer-btn ${activeLayer === layer.id ? 'active' : ''}`}
          onClick={() => setActiveLayer(layer.id)}
        >
          <div className="layer-dot" style={{ background: layer.color, boxShadow: layer.glow ? `0 0 6px ${layer.color}` : 'none' }}></div>
          <span className="layer-icon">{layer.icon}</span>
          {layer.label}
        </button>
      ))}

      <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '14px 0' }}></div>
      <div className="panel-title" style={{ marginBottom: '10px' }}>Active Storms (3)</div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div className="storm-item" style={{ background: 'rgba(255,107,53,0.1)', borderColor: 'rgba(255,107,53,0.25)' }}>
          <span>🌀</span>
          <div>
            <div style={{ color: '#ff9060', fontWeight: 500 }}>Hurricane Ana</div>
            <div style={{ color: 'var(--muted)', fontSize: '0.65rem' }}>Cat. 2 · Gulf of Mexico</div>
          </div>
        </div>
        <div className="storm-item" style={{ background: 'rgba(255,209,102,0.08)', borderColor: 'rgba(255,209,102,0.2)' }}>
          <span>🌪</span>
          <div>
            <div style={{ color: '#ffd166', fontWeight: 500 }}>Cyclone Bay</div>
            <div style={{ color: 'var(--muted)', fontSize: '0.65rem' }}>Tropical · Indian Ocean</div>
          </div>
        </div>
        <div className="storm-item" style={{ background: 'rgba(100,180,255,0.08)', borderColor: 'rgba(100,180,255,0.2)' }}>
          <span>⛈</span>
          <div>
            <div style={{ color: '#80b8ff', fontWeight: 500 }}>Storm Cell · EU</div>
            <div style={{ color: 'var(--muted)', fontSize: '0.65rem' }}>Severe · Central Europe</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayersPanel;

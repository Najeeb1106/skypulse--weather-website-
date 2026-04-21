import React from 'react';
import '../../styles/components/RadarMini.css';

const RadarMini = () => {
  return (
    <div className="radar-card">
      <div className="radar-header">
        <div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.95rem' }}>📡 Local Radar</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '2px' }}>Centered on New York, NY</div>
        </div>
        <button className="radar-view-btn">Full Radar →</button>
      </div>
      <div className="radar-mini">
        {/* Grid lines */}
        <div className="r-grid-line" style={{ width: '100%', height: '1px', top: '33%' }}></div>
        <div className="r-grid-line" style={{ width: '100%', height: '1px', top: '66%' }}></div>
        <div className="r-grid-line" style={{ width: '1px', height: '100%', left: '33%' }}></div>
        <div className="r-grid-line" style={{ width: '1px', height: '100%', left: '66%' }}></div>
        
        {/* Rings */}
        <div className="r-ring" style={{ width: '80px', height: '80px' }}></div>
        <div className="r-ring" style={{ width: '160px', height: '160px' }}></div>
        <div className="r-ring" style={{ width: '240px', height: '240px' }}></div>
        
        {/* Storm blobs */}
        <div style={{ position: 'absolute', top: '30%', left: '55%', width: '80px', height: '50px', background: 'radial-gradient(ellipse, rgba(0,212,255,0.3), transparent)', borderRadius: '50%', filter: 'blur(8px)', animation: 'blip 4s ease-in-out infinite' }}></div>
        <div style={{ position: 'absolute', top: '45%', left: '40%', width: '60px', height: '40px', background: 'radial-gradient(ellipse, rgba(126,232,250,0.2), transparent)', borderRadius: '50%', filter: 'blur(6px)', animation: 'blip 3s ease-in-out 1s infinite' }}></div>
        <div style={{ position: 'absolute', top: '20%', left: '30%', width: '100px', height: '60px', background: 'radial-gradient(ellipse, rgba(255,107,53,0.25), transparent)', borderRadius: '50%', filter: 'blur(10px)', animation: 'blip 5s ease-in-out 2s infinite' }}></div>
        
        {/* Sweep */}
        <div className="r-sweep"></div>
        <div className="r-center"></div>
        
        {/* Labels */}
        <div className="r-label" style={{ top: '8px', left: '8px' }}>NW</div>
        <div className="r-label" style={{ top: '8px', right: '8px' }}>NE</div>
        <div className="r-label" style={{ bottom: '8px', left: '8px' }}>SW</div>
        <div className="r-label" style={{ bottom: '8px', right: '8px' }}>SE</div>
      </div>
    </div>
  );
};

export default RadarMini;

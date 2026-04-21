import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import '../../styles/components/AstroRow.css';

const moonIcons = {
  'New Moon': '🌑',
  'Waxing Crescent': '🌒',
  'First Quarter': '🌓',
  'Waxing Gibbous': '🌔',
  'Full Moon': '🌕',
  'Waning Gibbous': '🌖',
  'Last Quarter': '🌗',
  'Waning Crescent': '🌘'
};

const AstroRow = () => {
  const { weatherData, loading } = useWeather();

  if (loading || !weatherData || !weatherData.forecast) return null;

  const astro = weatherData.forecast.forecastday[0].astro;

  const parseTime = (timeStr) => {
    if (!timeStr) return 0;
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') hours = '00';
    let h = parseInt(hours, 10);
    if (modifier === 'PM') h += 12;
    return h * 60 + parseInt(minutes, 10);
  };

  const calculateDayLength = (sunrise, sunset) => {
    const rise = parseTime(sunrise);
    const set = parseTime(sunset);
    let diff = set - rise;
    if (diff < 0) diff += 1440; // Handle cross-day if any
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    return `${h}h ${m}m`;
  };

  // Simple progress calculation for the sun arc (0 to 100)
  // Local time from API: "2023-01-01 15:30"
  const localTimeStr = weatherData.location.localtime.split(' ')[1];
  const currentMinutes = parseInt(localTimeStr.split(':')[0]) * 60 + parseInt(localTimeStr.split(':')[1]);
  const riseMinutes = parseTime(astro.sunrise);
  const setMinutes = parseTime(astro.sunset);
  
  let sunProgress = 0;
  if (currentMinutes > riseMinutes && currentMinutes < setMinutes) {
    sunProgress = ((currentMinutes - riseMinutes) / (setMinutes - riseMinutes)) * 100;
  } else if (currentMinutes >= setMinutes) {
    sunProgress = 100;
  }

  // Map progress to SVG Arc (Q 150 5)
  // This is a rough estimation for visual effect
  const sunX = 20 + (sunProgress / 100) * 260;
  const sunY = 75 - Math.sin((sunProgress / 100) * Math.PI) * 70;

  return (
    <div className="astro-row">
      <div className="astro-card">
        <div className="astro-header">
          <span className="astro-icon">🌅</span>
          <span className="astro-title">Sun & Daylight</span>
        </div>
        <svg className="arc-svg" viewBox="0 0 300 80">
          <defs>
            <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffd166" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#ff9a3c" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffd166" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path d="M 20 75 Q 150 5 280 75" stroke="rgba(255,209,102,0.2)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
          <path 
            d={`M 20 75 Q 150 5 ${sunX} ${sunY}`} 
            stroke="url(#sunGrad)" 
            strokeWidth="2" 
            fill="none" 
          />
          <circle cx={sunX} cy={sunY} r="6" fill="#ffd166" filter="url(#glow)" />
          <text x="15" y="74" fontSize="10" fill="#6a7f9a" fontFamily="DM Sans">Sunrise</text>
          <text x="255" y="74" fontSize="10" fill="#6a7f9a" fontFamily="DM Sans">Sunset</text>
        </svg>
        <div className="astro-times">
          <div className="astro-time-item">
            <div className="astro-time-label">Sunrise</div>
            <div className="astro-time-val" style={{ color: '#ffd166' }}>{astro.sunrise}</div>
          </div>
          <div className="astro-time-item">
            <div className="astro-time-label">Day Length</div>
            <div className="astro-time-val">{calculateDayLength(astro.sunrise, astro.sunset)}</div>
          </div>
          <div className="astro-time-item">
            <div className="astro-time-label">Sunset</div>
            <div className="astro-time-val" style={{ color: '#ff9a3c' }}>{astro.sunset}</div>
          </div>
        </div>
      </div>
      
      <div className="astro-card">
        <div className="astro-header">
          <span className="astro-icon">🌙</span>
          <span className="astro-title">Moon Phase</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '28px', padding: '16px 0' }}>
          <div style={{ fontSize: '3rem' }}>{moonIcons[astro.moon_phase] || '🌙'}</div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>{astro.moon_phase}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{astro.moon_illumination}% illuminated</div>
          </div>
        </div>
        <div className="astro-times">
          <div className="astro-time-item">
            <div className="astro-time-label">Moonrise</div>
            <div className="astro-time-val" style={{ color: 'var(--accent-ice)' }}>{astro.moonrise}</div>
          </div>
          <div className="astro-time-item">
            <div className="astro-time-label">Moonset</div>
            <div className="astro-time-val" style={{ color: 'var(--text-muted)' }}>{astro.moonset}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstroRow;

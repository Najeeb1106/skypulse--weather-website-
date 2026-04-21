import React, { useMemo } from 'react';
import { useWeather } from '../../context/WeatherContext';
import '../../styles/components/MonthlyChart.css';

const MonthlyChart = () => {
  const { city, weatherData, loading } = useWeather();

  const monthsData = useMemo(() => {
    if (!weatherData) return [];
    
    const lat = weatherData.location.lat;
    const isSouthern = lat < 0;
    const currentTemp = weatherData.current.temp_c;
    
    // Deterministic seed based on city name
    const getHash = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash);
    };
    const h = getHash(city);

    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    
    return monthNames.map((n, i) => {
      // Seasonal calculation: 
      // Northern Hemisphere peak is July (idx 6), Southern is Jan (idx 0).
      const peakIndex = isSouthern ? 0 : 6;
      const dist = Math.min(Math.abs(i - peakIndex), 12 - Math.abs(i - peakIndex));
      const seasonFactor = Math.cos(dist * Math.PI / 6); // 1.0 at peak, -1.0 at opposite
      
      const latFactor = (1 - lat / 90);
      const baseHi = (latFactor * 22) + 12; // Base annual peak high
      const amplitude = (lat / 90) * 12 + 4; // Further from equator = more seasonality
      
      const hi = Math.round(baseHi + (seasonFactor * amplitude) + (h % 4));
      const lo = Math.round(hi - (8 + (lat / 45) * 4)); // Night drops more in mid-latitudes
      const rain = Math.round((40 + (h % 40)) * (weatherData.current.humidity / 50) * (1 + Math.sin(i / 2)));
      
      return { n, hi, lo, rain };
    });
  }, [weatherData, city]);

  if (loading || !weatherData) return null;

  const maxR = 200;

  return (
    <div className="monthly-section">
      <div className="section-title">📅 Estimated Monthly Averages — {city}</div>
      <div className="monthly-wrap">
        <div className="chart-header">
          <div className="chart-header-title">Temperature & Precipitation by Month</div>
          <div className="chart-legend">
            <div className="legend-item"><div className="legend-dot" style={{ background:'var(--accent-storm)' }}></div>High °C</div>
            <div className="legend-item"><div className="legend-dot" style={{ background:'var(--accent-ice)' }}></div>Low °C</div>
            <div className="legend-item"><div className="legend-dot" style={{ background:'rgba(126, 232, 250, 0.2)' }}></div>Rain mm</div>
          </div>
        </div>
        <div className="months-grid">
          {monthsData.map((m, idx) => (
            <div key={idx} className="month-col">
              <div className="month-bars">
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, 
                  height: `${Math.min((m.rain/maxR)*100, 100)}%`, 
                  background: 'rgba(126, 232, 250, 0.1)', 
                  borderRadius: '4px 4px 0 0'
                }}></div>
                <div className="temp-bar-hi" style={{ height: `${Math.max(5, (m.hi + 10) * 2)}px`, background: 'var(--accent-storm)' }}></div>
                <div className="temp-bar-lo" style={{ height: `${Math.max(5, (m.lo + 15) * 2)}px`, opacity: 0.7, background: 'var(--accent-ice)' }}></div>
              </div>
              <div className="month-name">{m.n}</div>
              <div className="month-hi">{m.hi}°</div>
              <div className="month-lo">{m.lo}°</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthlyChart;

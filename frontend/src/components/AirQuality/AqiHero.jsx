import React, { useEffect, useRef } from 'react';
import { useWeather } from '../../context/WeatherContext';
import '../../styles/components/AqiHero.css';

const AqiHero = () => {
  const { city, weatherData, loading } = useWeather();
  const canvasRef = useRef(null);

  const getAqiInfo = (index) => {
    switch (index) {
      case 1: return { label: "Good", score: 25, status: "✓ Good", color: "#6ddc8b", desc: "Air quality is satisfactory and poses little or no risk. It's a great day to be outdoors." };
      case 2: return { label: "Moderate", score: 75, status: "! Moderate", color: "#ffd166", desc: "Air quality is acceptable; however, some pollutants may a be concern for a very small number of people." };
      case 3: return { label: "Unhealthy for Sensitive Groups", score: 125, status: "!! Poor", color: "#ff9a3c", desc: "Members of sensitive groups may experience health effects. The general public is less likely to be affected." };
      case 4: return { label: "Unhealthy", score: 175, status: "!!! Bad", color: "#ff6b6b", desc: "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects." };
      case 5: return { label: "Very Unhealthy", score: 250, status: "! Caution", color: "#a070ff", desc: "Health alert: The risk of health effects is increased for everyone." };
      case 6: return { label: "Hazardous", score: 400, status: "☣ Hazardous", color: "#9d0000", desc: "Health warning of emergency conditions: everyone is more likely to be affected." };
      default: return { label: "Unknown", score: 0, status: "N/A", color: "#666", desc: "Air quality data is currently unavailable for this location." };
    }
  };

  const aqiIndex = weatherData?.current?.air_quality?.['us-epa-index'] || 1;
  const aqi = getAqiInfo(aqiIndex);

  useEffect(() => {
    if (loading || !weatherData) return;
    
    const gc = canvasRef.current;
    if (!gc) return;
    const gctx = gc.getContext('2d');
    const cx = 120, cy = 130, r = 100;

    const drawGauge = () => {
      gctx.clearRect(0, 0, 240, 240);
      
      // Track
      gctx.beginPath();
      gctx.arc(cx, cy, r, Math.PI * 0.75, Math.PI * 0.25, false);
      gctx.strokeStyle = 'rgba(255,255,255,0.06)';
      gctx.lineWidth = 12;
      gctx.lineCap = 'round';
      gctx.stroke();

      // Color scale arcs
      const startA = Math.PI * 0.75;
      const totalA = Math.PI * 1.5;
      const aqiRatio = Math.min(aqi.score / 500, 1);

      gctx.beginPath();
      gctx.arc(cx, cy, r, startA, startA + totalA * aqiRatio, false);
      const grad = gctx.createLinearGradient(cx - r, cy, cx + r, cy);
      grad.addColorStop(0, aqi.color);
      grad.addColorStop(1, aqi.color + 'aa');
      gctx.strokeStyle = grad;
      gctx.lineWidth = 12;
      gctx.lineCap = 'round';
      gctx.stroke();

      // Glow
      gctx.beginPath();
      gctx.arc(cx, cy, r, startA, startA + totalA * aqiRatio, false);
      gctx.strokeStyle = `${aqi.color}33`;
      gctx.lineWidth = 20;
      gctx.stroke();

      // Needle end dot
      const endA = startA + totalA * aqiRatio;
      const dx = cx + Math.cos(endA) * r;
      const dy = cy + Math.sin(endA) * r;
      
      gctx.beginPath();
      gctx.arc(dx, dy, 7, 0, Math.PI * 2);
      gctx.fillStyle = aqi.color;
      gctx.fill();
      
      gctx.beginPath();
      gctx.arc(dx, dy, 12, 0, Math.PI * 2);
      gctx.fillStyle = `${aqi.color}40`;
      gctx.fill();
    };

    drawGauge();
  }, [loading, weatherData, aqi]);

  if (loading || !weatherData) {
    return (
      <div className="aqi-hero" style={{ opacity: 0.7, minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Loading live air quality data...</h2>
      </div>
    );
  }

  return (
    <div className="aqi-hero">
      <div className="aqi-gauge-wrap">
        <canvas ref={canvasRef} width="240" height="240"></canvas>
        <div className="gauge-center">
          <div className="gauge-num" style={{ color: aqi.color }}>{aqi.score}</div>
          <div className="gauge-label">AQI Score</div>
          <div className="gauge-status">{aqi.status}</div>
        </div>
      </div>
      <div className="aqi-info">
        <div className="aqi-location">📍 {city} · Live Data</div>
        <h1 className="aqi-city">Air Quality — {aqi.label}</h1>
        <p className="aqi-desc">{aqi.desc}</p>
        <div className="health-rec">
          <div className="rec-header">
            <span>💡</span>
            <h3>Health Recommendations</h3>
          </div>
          <div className="rec-items">
            {aqiIndex === 1 && <div className="rec-item">Ideal for all outdoor activities including jogging, cycling, and sports</div>}
            {aqiIndex === 1 && <div className="rec-item">Air quality typically improves further after 6 PM tonight</div>}
            {aqiIndex > 1 && <div className="rec-item">Limit prolonged outdoor exertion, especially if you have respiratory issues</div>}
            {aqiIndex > 2 && <div className="rec-item">Consider keeping windows closed and using an air purifier indoors</div>}
            <div className="rec-item">Sensitive individuals should monitor symptoms like coughing or shortness of breath</div>
            <div className="rec-item">Check local reports for specific pollutant warnings (Pollen, Dust)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AqiHero;

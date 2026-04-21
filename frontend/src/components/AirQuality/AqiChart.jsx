import React, { useState, useMemo } from 'react';
import { useWeather } from '../../context/WeatherContext';
import '../../styles/components/AqiChart.css';

const AqiChart = () => {
  const { weatherData, loading } = useWeather();
  const [activeTab, setActiveTab] = useState('24h');

  const chartData = useMemo(() => {
    if (!weatherData) return { scores: [], times: [], colors: [] };

    const currentAqi = weatherData?.current?.air_quality?.['us-epa-index'] || 1;
    const baseScore = [25, 75, 125, 175, 250, 400][currentAqi - 1] || 25;
    
    const scores = [];
    const times = [];
    const colors = [];
    
    // Simulate a 24-hour cycle trend
    for (let i = 0; i < 24; i++) {
      // Hour labels: 12a, 1, 2... 11p
      const hour = i % 24;
      const displayTime = hour === 0 ? '12a' : hour === 12 ? '12p' : hour > 12 ? hour - 12 : hour;
      times.push(displayTime);
      
      // Heuristic: AQI slightly fluctuates by hour (higher during morning/evening rush)
      const fluctuation = Math.sin((i - 8) * Math.PI / 12) * 8 + Math.cos((i - 18) * Math.PI / 12) * 5;
      const hourScore = Math.max(5, Math.round(baseScore + fluctuation));
      scores.push(hourScore);
      
      if (hourScore <= 50) colors.push('#6ddc8b');
      else if (hourScore <= 100) colors.push('#ffd166');
      else if (hourScore <= 150) colors.push('#ff9a3c');
      else colors.push('#ff6b6b');
    }
    
    return { scores, times, colors };
  }, [weatherData]);

  if (loading || !weatherData) return null;

  const maxV = Math.max(...chartData.scores, 100);

  return (
    <div className="chart-section">
      <div className="chart-wrap">
        <div className="chart-header">
          <div className="chart-title">📈 AQI Trend — 24 Hours</div>
          <div className="chart-tabs">
            {['24h', '7 days', '30 days'].map(tab => (
              <button 
                key={tab} 
                className={`chart-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="bars">
          {chartData.scores.map((v, i) => (
            <div key={i} className="bar-wrap">
              <div 
                className="bar" 
                style={{
                  height: `${(v/maxV)*100}px`,
                  background: chartData.colors[i],
                  opacity: i === 12 ? 1 : 0.6
                }}
                title={`${chartData.times[i]}: AQI ${v}`}
              ></div>
              <div className="bar-time">{chartData.times[i]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AqiChart;

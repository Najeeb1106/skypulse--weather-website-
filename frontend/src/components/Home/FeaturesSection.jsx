import React, { useEffect, useRef } from 'react';
import '../../styles/components/FeaturesSection.css';

const FeaturesSection = () => {
  const sectionRef = useRef(null);

  // Replicating your scroll reveal logic in React
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="features reveal" ref={sectionRef}>
      <div className="section-header">
        <div>
          <div className="section-tag">Why SkyPulse</div>
          <h2 className="section-title">Every Tool a<br />Forecaster Needs</h2>
        </div>
        <a href="#all-features" className="see-all">Explore all features →</a>
      </div>
      
      <div className="feature-grid">
        {/* Large card: Radar */}
        <div className="feat-card feat-large">
          <span className="feat-icon">📡</span>
          <div className="feat-title">Live Interactive Radar</div>
          <p className="feat-desc">
            Full-screen global radar with multi-layer overlays — wind, precipitation, temperature, clouds, and pressure. Rewind 3 hours or look 6 hours ahead.
          </p>
          
          <div className="radar-preview">
            <div className="radar-ring" style={{ width: '80px', height: '80px' }}></div>
            <div className="radar-ring" style={{ width: '150px', height: '150px' }}></div>
            <div className="radar-ring" style={{ width: '220px', height: '220px' }}></div>
            <div className="radar-sweep"></div>
            <div className="radar-center"></div>
            <div className="radar-blip" style={{ top: '40%', left: '55%', animationDelay: '0.5s' }}></div>
            <div className="radar-blip" style={{ top: '60%', left: '35%', animationDelay: '1.2s' }}></div>
            <div className="radar-blip" style={{ top: '30%', left: '70%', animationDelay: '2s' }}></div>
            <div className="radar-blip" style={{ top: '65%', left: '60%', animationDelay: '0.8s' }}></div>
          </div>
        </div>

        {/* Small cards */}
        <div className="feat-card">
          <span className="feat-icon">⚡</span>
          <div className="feat-title">Severe Alerts</div>
          <p className="feat-desc">Real-time push, SMS, and email alerts for hurricanes, tornadoes, floods, and blizzards worldwide.</p>
        </div>
        
        <div className="feat-card">
          <span className="feat-icon">💨</span>
          <div className="feat-title">Air Quality Index</div>
          <p className="feat-desc">Hourly AQI, pollen counts, and UV index with personalized health recommendations.</p>
        </div>
        
        <div className="feat-card">
          <span className="feat-icon">📅</span>
          <div className="feat-title">10-Day Forecast</div>
          <p className="feat-desc">Detailed hourly + daily forecasts with precipitation probability and feel-like temperatures.</p>
        </div>
        
        <div className="feat-card">
          <span className="feat-icon">🌍</span>
          <div className="feat-title">Global Climate Data</div>
          <p className="feat-desc">Historical climate data and monthly averages for every city on Earth. Perfect for travel planning.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
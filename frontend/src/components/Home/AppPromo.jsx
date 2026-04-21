import React, { useEffect, useRef } from 'react';
import { useWeather } from '../../context/WeatherContext';
import '../../styles/components/AppPromo.css';

const AppPromo = () => {
  const { city } = useWeather();
  const sectionRef = useRef(null);

  // Scroll reveal logic
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

  // Mock data for the phone screen
  const hourlyForecast = [
    { id: 1, time: 'Now', icon: '⛅', temp: '24°' },
    { id: 2, time: '2PM', icon: '☀️', temp: '27°' },
    { id: 3, time: '4PM', icon: '🌤', temp: '26°' },
    { id: 4, time: '6PM', icon: '🌧', temp: '22°' },
    { id: 5, time: '8PM', icon: '⛈', temp: '19°' },
    { id: 6, time: '10PM', icon: '🌙', temp: '17°' },
  ];

  const phoneStats = [
    { id: 1, label: 'Humidity', value: '65%' },
    { id: 2, label: 'Wind', value: '18 km/h' },
    { id: 3, label: 'UV Index', value: '6 High' },
    { id: 4, label: 'AQI', value: '42 Good', color: '#a8d8a8' },
  ];

  return (
    <section className="app-section reveal" ref={sectionRef}>
      <div className="app-content">
        <div className="section-tag">Mobile App</div>
        <h2 className="app-title">Weather That<br />Travels With You</h2>
        <p className="app-desc">
          Download SkyPulse for iOS and Android. Get home screen widgets, Apple Watch support, push notifications, and offline forecasts — so you're never caught off guard.
        </p>
        
        <div className="app-buttons">
          <a href="#ios" className="app-btn">
            <span className="app-btn-icon">🍎</span>
            <div className="app-btn-text">
              <div className="app-btn-label">Download on the</div>
              <div className="app-btn-store">App Store</div>
            </div>
          </a>
          <a href="#android" className="app-btn">
            <span className="app-btn-icon">▶️</span>
            <div className="app-btn-text">
              <div className="app-btn-label">Get it on</div>
              <div className="app-btn-store">Google Play</div>
            </div>
          </a>
        </div>
      </div>

      <div className="phone-mockup">
        <div className="phone-frame">
          <div className="phone-screen">
            
            <div className="phone-status">
              <span>9:41</span>
              <span>▮▮▮ 100%</span>
            </div>
            
            <div className="phone-location">📍 {city}</div>
            <div className="phone-temp-big">24°</div>
            <div className="phone-condition">Partly Cloudy · Feels like 26°</div>
            
            <div className="phone-hourly">
              {hourlyForecast.map((hour) => (
                <div key={hour.id} className="hour-item">
                  <div className="hour-time">{hour.time}</div>
                  <div className="hour-icon">{hour.icon}</div>
                  <div className="hour-temp">{hour.temp}</div>
                </div>
              ))}
            </div>
            
            <div className="phone-divider"></div>
            
            <div className="phone-stats">
              {phoneStats.map((stat) => (
                <div key={stat.id} className="phone-stat">
                  <div className="phone-stat-label">{stat.label}</div>
                  <div 
                    className="phone-stat-value" 
                    style={stat.color ? { color: stat.color } : {}}
                  >
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPromo;
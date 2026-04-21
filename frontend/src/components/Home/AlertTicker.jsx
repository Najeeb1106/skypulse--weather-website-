import React from 'react';
import '../../styles/components/AlertTicker.css';

const AlertTicker = () => {
  // We keep alerts in an array so we can easily fetch them from an API later
  const alerts = [
    "⚡ Severe Thunderstorm Warning — Miami, FL",
    "🌀 Tropical Storm Watch — Gulf Coast",
    "❄️ Winter Storm Advisory — Chicago, IL",
    "🔥 Extreme Heat Warning — Phoenix, AZ",
    "🌊 Coastal Flood Watch — New Orleans",
    "🌪 Tornado Watch — Oklahoma City"
  ];

  // Duplicating the array creates the seamless infinite scrolling effect
  const displayAlerts = [...alerts, ...alerts];

  return (
    <section className="alert-section">
      <div className="alert-ticker">
        
        <div className="alert-badge">
          <span className="alert-dot"></span> Live Alerts
        </div>
        
        <div className="alert-scroll">
          <div className="alert-text">
            {displayAlerts.map((alert, index) => (
              <span key={index} className="alert-item">
                {alert} &nbsp;&middot;&nbsp;
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AlertTicker;

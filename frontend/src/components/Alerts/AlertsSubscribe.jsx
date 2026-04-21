import React from 'react';
import '../../styles/components/AlertsSubscribe.css';

const AlertsSubscribe = () => {
  return (
    <div className="subscribe-section">
      <div>
        <div className="sub-title">🔔 Get Alerted Before the Storm Hits</div>
        <p className="sub-desc">
          Enter your city and we'll send you real-time warnings the moment severe weather threatens your area. Push, email, or SMS — your choice.
        </p>
        <div className="sub-trust">
          <div className="trust-item">Alerts sent within 60 seconds</div>
          <div className="trust-item">No spam, ever</div>
          <div className="trust-item">2M+ people protected</div>
          <div className="trust-item">Unsubscribe anytime</div>
        </div>
      </div>
      <div className="sub-form">
        <input className="sub-input" type="text" placeholder="📍 Your city or ZIP code" />
        <div className="sub-toggle-row">
          <button className="sub-toggle on">📱 Push</button>
          <button className="sub-toggle on">📧 Email</button>
          <button className="sub-toggle">💬 SMS</button>
        </div>
        <button className="sub-submit">⚡ Set Up My Alerts — Free</button>
      </div>
    </div>
  );
};

export default AlertsSubscribe;

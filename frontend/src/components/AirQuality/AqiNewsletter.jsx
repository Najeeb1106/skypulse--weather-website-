import React from 'react';
import '../../styles/components/AqiNewsletter.css';

const AqiNewsletter = () => {
  return (
    <div className="newsletter">
      <div>
        <div className="nl-title">☀️ Get Your Daily Air Quality Brief</div>
        <p className="nl-desc">Every morning at 7AM — your city's AQI, pollen count, UV index, and outdoor activity recommendation. 30 seconds to read. Free forever.</p>
      </div>
      <div className="nl-form">
        <input className="nl-input" type="email" placeholder="your@email.com"/>
        <button className="nl-btn">Send Me the Daily Digest</button>
      </div>
    </div>
  );
};

export default AqiNewsletter;

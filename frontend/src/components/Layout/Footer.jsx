import React from 'react';
import '../../styles/components/Footer.css';

const Footer = () => {
  const forecastLinks = [
    { name: 'Hourly Forecast', url: '#hourly' },
    { name: '10-Day Forecast', url: '#10-day' },
    { name: 'Radar & Maps', url: '#maps' },
    { name: 'Severe Alerts', url: '#alerts' },
  ];

  const dataLinks = [
    { name: 'Air Quality', url: '#air-quality' },
    { name: 'Climate History', url: '#climate' },
    { name: 'Wind Maps', url: '#wind' },
    { name: 'Weather API', url: '#api' },
  ];

  const companyLinks = [
    { name: 'About Us', url: '#about' },
    { name: 'Accuracy Stats', url: '#accuracy' },
    { name: 'Press', url: '#press' },
    { name: 'Contact', url: '#contact' },
  ];

  const socialLinks = [
    { icon: '𝕏', url: '#x' },
    { icon: 'in', url: '#linkedin' },
    { icon: '📘', url: '#facebook' },
    { icon: '📷', url: '#instagram' },
  ];

  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="logo">
            <div className="logo-icon" style={{ width: '28px', height: '28px', fontSize: '16px' }}>🌤</div>
            Sky<span>Pulse</span>
          </div>
          <p>
            Global weather intelligence for billions of people. Accurate, fast, and beautiful — on any device, anywhere on Earth.
          </p>
        </div>
        
        <div className="footer-col">
          <h4>Forecast</h4>
          <ul>
            {forecastLinks.map((link, index) => (
              <li key={index}><a href={link.url}>{link.name}</a></li>
            ))}
          </ul>
        </div>
        
        <div className="footer-col">
          <h4>Data</h4>
          <ul>
            {dataLinks.map((link, index) => (
              <li key={index}><a href={link.url}>{link.name}</a></li>
            ))}
          </ul>
        </div>
        
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            {companyLinks.map((link, index) => (
              <li key={index}><a href={link.url}>{link.name}</a></li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <span>© EST. 2024 to 2026 SkyPulse. All rights reserved.</span>
        <div className="socials">
          {socialLinks.map((social, index) => (
            <a key={index} className="social-btn" href={social.url}>
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useWeather } from '../../context/WeatherContext'; // Hook into the brain
import '../../styles/components/Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { searchCity } = useWeather(); // Extract the global search function

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchCity(searchTerm); // Broadcast the new city to all pages!
      setSearchTerm(''); // Clear input
      navigate('/forecast'); // Focus the user on the live dashboard
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
        <div className="logo-icon">🌤</div>
        Sky<span>Pulse</span>
      </Link>

      {/* New Search Input */}
      <form className="nav-search" onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Search city (e.g. Sargodha)..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>
      
      <ul className="nav-links">
        <li><NavLink to="/forecast">Forecast</NavLink></li>
        <li><NavLink to="/maps">Radar & Maps</NavLink></li>
        <li><NavLink to="/alerts">Severe Alerts</NavLink></li>
        <li><NavLink to="/air-quality">Air Quality</NavLink></li>
        <li><NavLink to="/climate">Climate</NavLink></li>
        <li><Link to="/app" className="nav-cta">Get the App</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
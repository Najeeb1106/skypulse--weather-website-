import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeather } from '../../context/WeatherContext';
import '../../styles/components/HeroSection.css';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { searchCity } = useWeather();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchCity(searchQuery);
      navigate('/forecast');
    }
  };

  const handleChipClick = (city) => {
    searchCity(city);
    navigate('/forecast');
  };

  // Popular selection chips
  const popularCities = ['Islamabad', 'Dubai', 'Tokyo', 'London', 'Kyoto', 'Sydney'];

  return (
    <section className="hero">
      <div className="hero-eyebrow">
        <span className="live-dot"></span>
        Live Global Weather Data
      </div>
      
      <h1 className="hero-title">
        <span className="line1">The World's Weather,</span>
        <span className="line2">In Your Hands.</span>
      </h1>
      
      <p className="hero-sub">
        Hyperlocal forecasts, live radar, and severe weather alerts for every city on Earth — updated every minute.
      </p>

      <form className="search-wrap" onSubmit={handleSearch}>
        <span className="search-icon">🔍</span>
        <input 
          type="text" 
          className="search-bar" 
          placeholder="Search any city, region, or country..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-btn">Search</button>
      </form>

      <div className="popular">
        <span className="popular-label">Popular:</span>
        {popularCities.map((city) => (
          <span 
            key={city} 
            className="city-chip"
            onClick={() => handleChipClick(city)}
          >
            {city}
          </span>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
import React, { useState } from 'react';
import { useWeather } from '../../context/WeatherContext';
import { MapPin, X, Trash2 } from 'lucide-react';
import '../../styles/components/SavedCitiesSidebar.css';

const SavedCitiesSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { savedCities, searchCity, userToken, deleteSavedCity } = useWeather();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleCityClick = (city) => {
    searchCity(city);
    setIsOpen(false);
  };

  return (
    <>
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        <MapPin size={24} />
      </button>

      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      <div className={`saved-cities-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Saved Locations</h2>
          <button className="sidebar-close-btn" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        <div className="sidebar-content">
          {!userToken ? (
            <p className="sidebar-message">Log in to view your saved locations.</p>
          ) : savedCities && savedCities.length > 0 ? (
            <ul className="saved-cities-list">
              {savedCities.map((loc, index) => (
                <li 
                  key={index} 
                  className="saved-city-item" 
                  onClick={() => handleCityClick(loc.city)}
                >
                  <div className="city-info">
                    <span className="city-name">{loc.city}</span>
                    <span className="country-name">{loc.country}</span>
                  </div>
                  <button 
                    className="delete-city-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSavedCity(loc.city);
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="sidebar-message">No saved locations yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SavedCitiesSidebar;

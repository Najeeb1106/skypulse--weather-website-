import React, { useState } from 'react';
import { useWeather } from '../../context/WeatherContext';
import '../../styles/components/SaveLocation.css';

const SaveLocation = () => {
  const { city, saveCurrentCity, userToken } = useWeather();
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = async () => {
    setIsSaving(true);
    await saveCurrentCity();
    setIsSaving(false);
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="save-card">
      <div className="save-title">⭐ Save {city}</div>
      <div className="save-desc">
        Get personalized forecasts, severe weather alerts, and daily weather briefings for this location.
      </div>
      
      {userToken ? (
        <button className="save-btn" onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save This Location'}
        </button>
      ) : (
        <>
          <button className="save-btn" disabled>Sign in to Save</button>
          <div className="save-divider">or</div>
          <button className="google-btn" onClick={handleGoogleLogin}>🔵 Continue with Google</button>
        </>
      )}

      <div className="perk-list">
        <div className="perk">Daily morning weather brief</div>
        <div className="perk">Severe weather push alerts</div>
        <div className="perk">Up to 20 saved locations</div>
        <div className="perk">No ads, no spam, ever</div>
      </div>
    </div>
  );
};

export default SaveLocation;

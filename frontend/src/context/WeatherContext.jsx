import React, { createContext, useState, useContext, useEffect } from 'react';

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState('New York');
  const [unit, setUnit] = useState('metric');
  
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [savedCities, setSavedCities] = useState([]);
  const [userToken, setUserToken] = useState(localStorage.getItem('skyPulseToken') || null);

  const fetchWeather = async (searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY?.trim();
      
      if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
        throw new Error('Weather API key is missing. Please check your .env file.');
      }

      // Fetching all-in-one data: Forecast (3 days), Air Quality, and Severe Alerts
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchQuery}&days=10&aqi=yes&alerts=yes`
      );
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: Invalid API Key. Please check your dashboard.');
        }
        throw new Error('Failed to fetch weather data. Please ensure the city name is correct.');
      }

      const data = await response.json();
      setWeatherData(data);
      setCity(data.location.name);
    } catch (err) {
      console.error('SkyPulse Context Error:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check URL for token after OAuth redirect
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    if (token) {
      localStorage.setItem('skyPulseToken', token);
      setUserToken(token);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    fetchWeather(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSavedCities = async () => {
    if (!userToken) return;
    try {
      const endpoint = `${import.meta.env.VITE_API_URL}/api/users/locations`;
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setSavedCities(data);
      }
    } catch (err) {
      console.error('Fetch saved cities error:', err);
    }
  };

  useEffect(() => {
    if (userToken) {
      fetchSavedCities();
    }
  }, [userToken]);

  const searchCity = (newCity) => {
    fetchWeather(newCity);
  };

  const saveCurrentCity = async () => {
    if (!weatherData) return;

    try {
      const locationToSave = {
        city: weatherData.location.name,
        country: weatherData.location.country,
        lat: weatherData.location.lat,
        lon: weatherData.location.lon,
      };

      const endpoint = `${import.meta.env.VITE_API_URL}/api/users/save-location`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({ location: locationToSave }),
      });

      if (response.ok) {
        const updatedLocations = await response.json();
        setSavedCities(updatedLocations);
        alert('City Saved!');
      } else if (response.status === 400) {
        alert('City is already saved.');
      } else {
        alert('Failed to save city.');
      }
    } catch (err) {
      console.error('Save City Error:', err);
      alert('An error occurred while saving the city.');
    }
  };

  const deleteSavedCity = async (cityName) => {
    if (!userToken) return;

    try {
      const endpoint = `${import.meta.env.VITE_API_URL}/api/users/locations/${encodeURIComponent(cityName)}`;
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const updatedLocations = await response.json();
        setSavedCities(updatedLocations);
      } else {
        console.error('Failed to delete city');
      }
    } catch (err) {
      console.error('Delete City Error:', err);
    }
  };

  return (
    <WeatherContext.Provider value={{ city, weatherData, loading, error, searchCity, unit, setUnit, saveCurrentCity, savedCities, userToken, fetchSavedCities, deleteSavedCity }}>
      {children}
    </WeatherContext.Provider>
  );
};
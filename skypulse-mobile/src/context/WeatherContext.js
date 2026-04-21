import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import apiClient from '../api/client';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState('New York');
  const [weatherData, setWeatherData] = useState(null);
  const [savedCities, setSavedCities] = useState([]);
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check for token on mount
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('skyPulseToken');
      if (token) {
        setUserToken(token);
        fetchSavedCities();
      }
    } catch (error) {
      console.error('Error checking token:', error);
    }
  };

  const searchCity = async (searchQuery) => {
    if (!searchQuery) return;
    setLoading(true);
    setError(null);
    try {
      const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY; 
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchQuery}&days=3&aqi=yes&alerts=yes`
      );
      setWeatherData(response.data);
      setCity(response.data.location.name);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setError('City not found. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedCities = async () => {
    try {
      const response = await apiClient.get('/users/locations');
      if (response.data.status === 'success') {
        setSavedCities(response.data.data.locations);
      }
    } catch (error) {
      console.error('Error fetching saved cities:', error);
    }
  };

  const saveCurrentCity = async () => {
    if (!weatherData) return;
    try {
      const { name, country, lat, lon } = weatherData.location;
      const response = await apiClient.post('/users/save-location', {
        location: { city: name, country, lat, lon }
      });
      if (response.data.status === 'success') {
        fetchSavedCities(); // Refresh the list
      }
    } catch (error) {
      console.error('Error saving city:', error);
    }
  };

  const deleteSavedCity = async (cityName) => {
    try {
      const response = await apiClient.delete(`/users/locations/${encodeURIComponent(cityName)}`);
      if (response.data.status === 'success') {
        setSavedCities(prev => prev.filter(c => c.city !== cityName));
      }
    } catch (error) {
      console.error('Error deleting city:', error);
    }
  };

  return (
    <WeatherContext.Provider value={{
      city,
      setCity,
      weatherData,
      savedCities,
      userToken,
      loading,
      error,
      searchCity,
      fetchSavedCities,
      saveCurrentCity,
      deleteSavedCity
    }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

export default WeatherContext;

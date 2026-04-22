import React, { createContext, useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import apiClient from '../api/client';

WebBrowser.maybeCompleteAuthSession();

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState('New York');
  const [weatherData, setWeatherData] = useState(null);
  const [savedCities, setSavedCities] = useState([]);
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check for token on mount and search default city
  useEffect(() => {
    checkToken();
    searchCity(city);
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

  const loginWithGoogle = async () => {
    try {
      const returnUrl = Linking.createURL('/');
      const authUrl = `https://skypulse-api.loca.lt/api/auth/google?redirect=${encodeURIComponent(returnUrl)}`;
      
      const result = await WebBrowser.openAuthSessionAsync(authUrl, returnUrl);
      
      if (result.type === 'success' && result.url) {
        const tokenMatch = result.url.match(/token=([^&]+)/);
        if (tokenMatch && tokenMatch[1]) {
          const token = tokenMatch[1];
          await AsyncStorage.setItem('skyPulseToken', token);
          setUserToken(token);
          fetchSavedCities();
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const searchCity = async (searchQuery) => {
    if (!searchQuery) return;
    
    const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY; 
    if (!API_KEY) {
      console.error('CRITICAL: Weather API Key is missing from .env');
      setError('System configuration error. Please try again later.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Using fresh axios directly to avoid apiClient JWT injection
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchQuery}&days=1&aqi=yes&alerts=no`
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
    if (!userToken) return;
    try {
      const response = await apiClient.get('/users/locations', {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      // The backend returns the array directly
      setSavedCities(response.data);
    } catch (error) {
      console.error('Error fetching saved cities:', error.response?.data || error.message);
    }
  };

  const saveCurrentCity = async () => {
    if (!weatherData || !userToken) return;
    try {
      const { name, country, lat, lon } = weatherData.location;
      
      // Construct precise payload for backend schema
      const payload = {
        location: {
          city: name,
          country: country,
          lat: lat,
          lon: lon
        }
      };

      const response = await apiClient.post('/users/save-location', payload, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });

      if (response.status === 200) {
        setSavedCities(response.data);
      }
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message === 'City already saved') {
        Alert.alert("Already Saved", "This location is already in your saved list.");
      } else {
        Alert.alert("Error", "Could not save the location. Please try again.");
      }
    }
  };

  const deleteSavedCity = async (cityName) => {
    if (!userToken) return;
    try {
      const response = await apiClient.delete(`/users/locations/${encodeURIComponent(cityName)}`, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      // Backend returns updated list
      setSavedCities(response.data);
    } catch (error) {
      console.error('Error deleting city:', error.response?.data || error.message);
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
      deleteSavedCity,
      loginWithGoogle
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


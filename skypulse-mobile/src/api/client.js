import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * IMPORTANT: Mobile devices (and emulators) cannot use 'localhost' to reach your backend.
 * 'localhost' points to the device itself.
 * 
 * Set baseURL to your computer's local IPv4 address (e.g., http://192.168.1.8:5000/api).
 * Ensure your backend server is listening on 0.0.0.0 or your local IP.
 */
const apiClient = axios.create({
  baseURL: 'http://192.168.1.9:5000/api', // Use local IP for speed, OAuth uses tunnel
  timeout: 10000,
});

// Request interceptor to attach JWT token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('skyPulseToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error fetching token from storage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;

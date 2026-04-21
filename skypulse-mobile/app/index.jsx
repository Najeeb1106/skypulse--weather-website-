import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useWeather } from '../src/context/WeatherContext';

/**
 * SkyPulse Dashboard
 * The primary screen for searching and viewing current weather conditions.
 */
export default function Dashboard() {
  const { weatherData, loading, error, searchCity } = useWeather();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    if (searchInput.trim()) {
      searchCity(searchInput);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header & Search Bar */}
          <View style={styles.header}>
            <Text style={styles.title}>SkyPulse</Text>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                placeholder="Search City..."
                placeholderTextColor="#94a3b8"
                value={searchInput}
                onChangeText={setSearchInput}
                onSubmitEditing={handleSearch}
              />
              <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Text style={styles.searchButtonText}>Go</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Status Indicators */}
          {loading && (
            <ActivityIndicator size="large" color="#a5b4fc" style={styles.loader} />
          )}

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Hero Weather Section */}
          {weatherData && !loading && (
            <View style={styles.weatherHero}>
              <View style={styles.locationInfo}>
                <Text style={styles.cityName}>{weatherData.location.name}</Text>
                <Text style={styles.countryName}>{weatherData.location.country}</Text>
              </View>

              <View style={styles.tempContainer}>
                <Text style={styles.tempText}>{Math.round(weatherData.current.temp_c)}°C</Text>
                <Image 
                  source={{ uri: 'https:' + weatherData.current.condition.icon }} 
                  style={styles.weatherIcon}
                />
              </View>

              <Text style={styles.conditionText}>{weatherData.current.condition.text}</Text>
              
              <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Humidity</Text>
                  <Text style={styles.detailValue}>{weatherData.current.humidity}%</Text>
                </View>
                <View style={[styles.detailItem, styles.borderLeft]}>
                  <Text style={styles.detailLabel}>Wind</Text>
                  <Text style={styles.detailValue}>{weatherData.current.wind_kph} km/h</Text>
                </View>
              </View>
            </View>
          )}

          {!weatherData && !loading && !error && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Enter a city to see the current pulse.</Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // Match web Slate 900
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    flexGrow: 1,
  },
  header: {
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#1E293B', // Slate 800
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  input: {
    flex: 1,
    height: 44,
    color: '#F8FAFC',
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#6366F1', // Indigo 500
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  loader: {
    marginTop: 50,
  },
  errorContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  errorText: {
    color: '#ef4444',
    textAlign: 'center',
  },
  weatherHero: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  locationInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cityName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F8FAFC',
    textAlign: 'center',
  },
  countryName: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tempText: {
    fontSize: 72,
    fontWeight: '800',
    color: '#F8FAFC',
    marginRight: 10,
  },
  weatherIcon: {
    width: 64,
    height: 64,
  },
  conditionText: {
    fontSize: 20,
    color: '#a5b4fc', // Indigo 300
    marginBottom: 30,
    fontWeight: '500',
  },
  detailsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 20,
    width: '100%',
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  borderLeft: {
    borderLeftWidth: 1,
    borderLeftColor: '#334155',
  },
  detailLabel: {
    fontSize: 12,
    color: '#94a3b8',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#64748b',
    fontSize: 16,
    textAlign: 'center',
  }
});

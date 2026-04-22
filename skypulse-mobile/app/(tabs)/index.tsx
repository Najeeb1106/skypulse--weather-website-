import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWeather } from '../../src/context/WeatherContext';
import { Ionicons } from '@expo/vector-icons';



/**
 * SkyPulse Dashboard - Premium Redesign
 */
export default function Home() {
  const { weatherData, loading, error, searchCity, loginWithGoogle, userToken, saveCurrentCity } = useWeather();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    if (searchInput.trim()) {
      searchCity(searchInput);
    }
  };

  // Helper to get next 5 hours
  const getHourlyForecast = () => {
    if (!weatherData?.forecast?.forecastday?.[0]?.hour) return [];
    const hourStr = weatherData.location.localtime.split(' ')[1];
    const currentHour = parseInt(hourStr.split(':')[0], 10);
    return weatherData.forecast.forecastday[0].hour.slice(currentHour, currentHour + 5);
  };

  const formatHour = (timeStr: string, isNow: boolean) => {
    if (isNow) return 'Now';
    const hour = parseInt(timeStr.split(' ')[1].split(':')[0], 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}${ampm}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search City..."
              placeholderTextColor="#94a3b8"
              value={searchInput}
              onChangeText={setSearchInput}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity onPress={handleSearch}>
              <Ionicons name="search" size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          {/* Status Indicators */}
          {loading && (
            <ActivityIndicator size="large" color="#4ADE80" style={styles.loader} />
          )}

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Redesigned UI */}
          {weatherData && !loading && (
            <View style={styles.content}>
              {/* Header */}
              <View style={styles.header}>
                <Ionicons name="location-sharp" size={16} color="#FF4D4D" />
                <Text style={styles.cityName}>{weatherData.location.name}</Text>
              </View>

              {/* Hero Temp */}
              <View style={styles.heroContainer}>
                <View style={styles.tempWrapper}>
                  <Text style={styles.heroTemp}>{Math.round(weatherData.current.temp_c)}</Text>
                  <Text style={styles.degreeSymbol}>°</Text>
                </View>
                <Text style={styles.heroCondition}>
                  {weatherData.current.condition.text} · Feels like {Math.round(weatherData.current.feelslike_c)}°
                </Text>
              </View>

              {/* Hourly Forecast */}
              <View style={styles.hourlySection}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {getHourlyForecast().map((hour: any, index: number) => (
                    <View key={index} style={styles.hourColumn}>
                      <Text style={styles.hourText}>{formatHour(hour.time, index === 0)}</Text>
                      <Image 
                        source={{ uri: 'https:' + hour.condition.icon }} 
                        style={styles.hourIcon}
                      />
                      <Text style={styles.hourTemp}>{Math.round(hour.temp_c)}°</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>

              {/* Metrics Grid */}
              <View style={styles.grid}>
                <View style={styles.card}>
                  <Text style={styles.cardSubtitle}>HUMIDITY</Text>
                  <Text style={styles.cardValue}>{weatherData.current.humidity}%</Text>
                </View>

                <View style={styles.card}>
                  <Text style={styles.cardSubtitle}>WIND</Text>
                  <Text style={styles.cardValue}>{Math.round(weatherData.current.wind_kph)} km/h</Text>
                </View>

                <View style={styles.card}>
                  <Text style={styles.cardSubtitle}>UV INDEX</Text>
                  <Text style={styles.cardValue}>
                    {weatherData.current.uv} {weatherData.current.uv <= 2 ? 'Low' : weatherData.current.uv <= 5 ? 'Moderate' : 'High'}
                  </Text>
                </View>

                <View style={styles.card}>
                  <Text style={styles.cardSubtitle}>AQI</Text>
                  <Text style={[styles.cardValue, { color: '#4ADE80' }]}>
                    {Math.round(weatherData.current.air_quality.pm2_5)}
                  </Text>
                  <Text style={[styles.cardSubtitle, { color: '#4ADE80', marginTop: 2, textTransform: 'none' }]}>
                    Good
                  </Text>
                </View>
              </View>

              {/* Auth & Action Buttons */}
              <View style={styles.actionContainer}>
                {!userToken ? (
                  <TouchableOpacity 
                    style={styles.authButton} 
                    onPress={loginWithGoogle}
                  >
                    <Ionicons name="logo-google" size={18} color="white" style={{ marginRight: 10 }} />
                    <Text style={styles.authButtonText}>Continue with Google</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity 
                    style={styles.saveButton} 
                    onPress={saveCurrentCity}
                  >
                    <Ionicons name="bookmark" size={18} color="white" style={{ marginRight: 10 }} />
                    <Text style={styles.saveButtonText}>Save This Location</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}

          {!weatherData && !loading && !error && (
            <View style={styles.emptyContainer}>
              <Ionicons name="cloud-outline" size={64} color="#1E293B" />
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
    backgroundColor: '#0B132B', // Very dark navy
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 10,
    paddingBottom: 80, // Reduced as we want to avoid scrolling
    flexGrow: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#1C2541',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 16,
    marginRight: 10,
  },
  loader: {
    marginTop: 100,
  },
  errorContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  errorText: {
    color: '#ef4444',
    textAlign: 'center',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cityName: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    color: '#F8FAFC',
    marginLeft: 8,
  },
  heroContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  tempWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  heroTemp: {
    fontSize: 90,
    fontFamily: 'Inter_900Black',
    color: '#F8FAFC',
    letterSpacing: -4,
  },
  degreeSymbol: {
    fontSize: 50,
    color: '#F8FAFC',
    fontFamily: 'Inter_400Regular',
    marginTop: 20,
    marginLeft: 4,
  },
  heroCondition: {
    fontSize: 18,
    color: '#94A3B8',
    fontFamily: 'Inter_400Regular',
    marginTop: -10,
  },
  hourlySection: {
    marginBottom: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#1E293B',
    paddingVertical: 12,
  },
  hourColumn: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 65,
    height: 85,
  },
  hourText: {
    color: '#94A3B8',
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
  },
  hourIcon: {
    width: 44,
    height: 44,
  },
  hourTemp: {
    color: '#F8FAFC',
    fontSize: 18,
    fontFamily: 'Inter_900Black',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  card: {
    width: '48%',
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
  },
  cardSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#64748B',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardValue: {
    fontSize: 22,
    fontFamily: 'Outfit_700Bold',
    color: '#F8FAFC',
  },
  actionContainer: {
    gap: 12,
  },
  authButton: {
    flexDirection: 'row',
    backgroundColor: '#3A506B',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#6366F1',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: '#334155',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    maxWidth: '80%',
  }
});



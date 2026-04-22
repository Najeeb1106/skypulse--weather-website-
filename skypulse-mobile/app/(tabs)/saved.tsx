import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWeather } from '../../src/context/WeatherContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

/**
 * Saved Cities Screen
 * Displays a list of locations saved by the user.
 */
export default function Saved() {
  const { savedCities, loading, fetchSavedCities, userToken, searchCity, setCity } = useWeather();
  const router = useRouter();

  useEffect(() => {
    if (userToken) {
      fetchSavedCities();
    }
  }, [userToken]);

  const handleSelectCity = async (cityName: string) => {
    searchCity(cityName);
    router.replace('/' as any);
  };

  const renderCityItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.cityCard} 
      onPress={() => handleSelectCity(item.city)}
    >
      <View style={styles.cityInfo}>
        <Text style={styles.cityName}>{item.city}</Text>
        <Text style={styles.countryName}>{item.country}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#64748B" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Locations</Text>
      </View>

      {!userToken ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="lock-closed-outline" size={64} color="#1E293B" />
          <Text style={styles.emptyText}>Sign in to view your saved locations.</Text>
        </View>
      ) : loading && savedCities.length === 0 ? (
        <ActivityIndicator size="large" color="#6366F1" style={styles.loader} />
      ) : savedCities.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="bookmark-outline" size={64} color="#1E293B" />
          <Text style={styles.emptyText}>You haven't saved any locations yet.</Text>
        </View>
      ) : (
        <FlatList
          data={savedCities}
          keyExtractor={(item) => item._id || item.city}
          renderItem={renderCityItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B132B',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: -0.5,
  },
  listContent: {
    padding: 24,
    paddingTop: 8,
    paddingBottom: 100, // Account for floating tab bar
  },
  cityCard: {
    backgroundColor: '#1C2541',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#3A506B',
  },
  cityInfo: {
    flex: 1,
  },
  cityName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  countryName: {
    fontSize: 14,
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    color: '#64748B',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 24,
  },
});

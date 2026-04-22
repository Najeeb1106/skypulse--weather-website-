import { Stack, useRouter, useSegments } from 'expo-router';
import { WeatherProvider } from '../src/context/WeatherContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Inter_900Black, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Outfit_700Bold, Outfit_400Regular } from '@expo-google-fonts/outfit';
import { useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_900Black,
    Inter_400Regular,
    Inter_700Bold,
    Outfit_700Bold,
    Outfit_400Regular,
  });

  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const checkOnboarding = async () => {
      const value = await AsyncStorage.getItem('hasSeenOnboarding');
      setHasSeenOnboarding(value === 'true');
    };
    checkOnboarding();
  }, []);

  useEffect(() => {
    if ((loaded || error) && hasSeenOnboarding !== null) {
      SplashScreen.hideAsync();
      
      // Handle initial routing
      const inOnboardingGroup = segments[0] === 'onboarding';
      if (hasSeenOnboarding === false && !inOnboardingGroup) {
        router.replace('/onboarding');
      } else if (hasSeenOnboarding === true && inOnboardingGroup) {
        router.replace('/(tabs)');
      }
    }
  }, [loaded, error, hasSeenOnboarding, segments]);

  if ((!loaded && !error) || hasSeenOnboarding === null) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <WeatherProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="onboarding" />
        </Stack>
      </WeatherProvider>
    </SafeAreaProvider>
  );
}

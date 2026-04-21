import { Stack } from 'expo-router';
import { WeatherProvider } from '../src/context/WeatherContext';

/**
 * Root Layout Component
 * Wraps the entire Expo Router application in the WeatherProvider
 * to share global state (city, weatherData, auth) across all screens.
 */
export default function RootLayout() {
  return (
    <WeatherProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* All app screens will be managed by Expo Router here */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </WeatherProvider>
  );
}

import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import AlertTicker from '../components/Home/AlertTicker';
import WorldWeatherStrip from '../components/Home/WorldWeatherStrip';
import FeaturesSection from '../components/Home/FeaturesSection';
import StatsSection from '../components/Home/StatsSection';
import AppPromo from '../components/Home/AppPromo';

const Home = () => {
  return (
    <main>
      <HeroSection />
      <AlertTicker />
      <WorldWeatherStrip />
      <FeaturesSection />
      <StatsSection />
      <AppPromo />
    </main>
  );
};

export default Home;
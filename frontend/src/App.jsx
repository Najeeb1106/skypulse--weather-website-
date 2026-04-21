import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './styles/global.css'; 

// Layout Components (These appear on every page)
import AnimatedBackground from './components/Layout/AnimatedBackground';
import Cursor from './components/Layout/Cursor';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import SavedCitiesSidebar from './components/Navigation/SavedCitiesSidebar';

// Pages
import Home from './pages/Home';
import Forecast from './pages/Forecast'; 
import Alerts from './pages/Alerts';
import AirQuality from './pages/AirQuality';
import Climate from './pages/Climate';
import Radar from './pages/Radar';

const AppContent = () => {
  const location = useLocation();
  const hideFooter = location.pathname === '/maps';

  return (
    <>
      <Cursor />
      <AnimatedBackground />
      <Navbar />
      <SavedCitiesSidebar />
      
      {/* The Routes determine which page component to inject here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/air-quality" element={<AirQuality />} />
        <Route path="/climate" element={<Climate />} />
        <Route path="/maps" element={<Radar />} />
      </Routes>
      
      {!hideFooter && <Footer />}
    </>
  );
};


function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </Router>
  );
}

export default App;
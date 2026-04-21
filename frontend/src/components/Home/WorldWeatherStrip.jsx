import React from 'react';
import '../../styles/components/WorldWeatherStrip.css';

const WorldWeatherStrip = () => {
  // Mock data array - ready to be replaced by an API call
  const weatherData = [
    {
      id: 1,
      city: 'Dubai',
      country: 'UAE',
      temp: '42°',
      condition: 'Sunny, Clear Skies',
      icon: '☀️',
      humidity: '12%',
      wind: '8 km/h',
      tempClass: 'hot'
    },
    {
      id: 2,
      city: 'London',
      country: 'UK',
      temp: '14°',
      condition: 'Light Rain',
      icon: '🌧️',
      humidity: '78%',
      wind: '22 km/h',
      tempClass: 'mild'
    },
    {
      id: 3,
      city: 'Tokyo',
      country: 'Japan',
      temp: '22°',
      condition: 'Partly Cloudy',
      icon: '⛅',
      humidity: '55%',
      wind: '15 km/h',
      tempClass: 'mild'
    },
    {
      id: 4,
      city: 'Moscow',
      country: 'Russia',
      temp: '-8°',
      condition: 'Heavy Snow',
      icon: '❄️',
      humidity: '88%',
      wind: '30 km/h',
      tempClass: 'cold'
    },
    {
      id: 5,
      city: 'Sargodha',
      country: 'Pakistan',
      temp: '34°',
      condition: 'Clear, Warm',
      icon: '☀️',
      humidity: '45%',
      wind: '10 km/h',
      tempClass: 'hot'
    },
    {
      id: 6,
      city: 'Sydney',
      country: 'Australia',
      temp: '26°',
      condition: 'Mostly Sunny',
      icon: '🌤️',
      humidity: '61%',
      wind: '18 km/h',
      tempClass: 'mild'
    }
  ];

  return (
    <section className="weather-strip">
      <div className="strip-title">🌍 Live Weather Around the World</div>
      
      <div className="weather-cards">
        {weatherData.map((data, index) => (
          <div 
            key={data.id} 
            className="weather-card" 
            style={{ '--i': index + 1 }}
          >
            <span className="card-icon">{data.icon}</span>
            <div className="card-city">{data.city}</div>
            <div className="card-country">{data.country}</div>
            <div className={`card-temp ${data.tempClass}`}>{data.temp}</div>
            <div className="card-condition">{data.condition}</div>
            
            <div className="card-details">
              <div className="card-detail">
                <strong>{data.humidity}</strong>Humidity
              </div>
              <div className="card-detail">
                <strong>{data.wind}</strong>Wind
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorldWeatherStrip;

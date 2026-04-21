import React, { useEffect, useRef } from 'react';
import '../../styles/components/StatsSection.css';

const StatsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const stats = [
    { id: 1, value: '195', label: 'Countries Covered' },
    { id: 2, value: '2M+', label: 'Weather Stations' },
    { id: 3, value: '97.3%', label: 'Forecast Accuracy' },
    { id: 4, value: '1min', label: 'Update Frequency' },
  ];

  return (
    <section className="stats-section reveal" ref={sectionRef}>
      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-item">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
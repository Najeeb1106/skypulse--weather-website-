import React, { useMemo } from 'react';
import '../../styles/components/AnimatedBackground.css';

const AnimatedBackground = () => {
  // Generate stars data once
  const stars = useMemo(() => {
    return Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 0.5,
      top: Math.random() * 100,
      left: Math.random() * 100,
      dur: 2 + Math.random() * 4,
      delay: Math.random() * 5,
      maxOp: 0.3 + Math.random() * 0.7,
    }));
  }, []);

  // Generate clouds data once
  const clouds = useMemo(() => {
    const colors = ['rgba(0,100,200,1)', 'rgba(0,150,255,1)', 'rgba(50,100,200,1)'];
    return Array.from({ length: 5 }).map((_, i) => {
      const size = 200 + Math.random() * 400;
      return {
        id: i,
        size: size,
        top: Math.random() * 60,
        left: -size,
        color: colors[i % colors.length],
        duration: 40 + Math.random() * 60,
        delay: -(Math.random() * 60),
      };
    });
  }, []);

  return (
    <>
      {/* Base Sky Gradient */}
      <div className="sky-bg"></div>

      {/* Stars Layer */}
      <div className="stars">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              '--dur': `${star.dur}s`,
              '--delay': `${star.delay}s`,
              '--max-op': star.maxOp,
            }}
          ></div>
        ))}
      </div>

      {/* Clouds Layer */}
      <div className="clouds">
        {clouds.map((cloud) => (
          <div
            key={cloud.id}
            className="cloud"
            style={{
              width: `${cloud.size}px`,
              height: `${cloud.size * 0.6}px`,
              top: `${cloud.top}%`,
              left: `${cloud.left}px`,
              background: cloud.color,
              animationDuration: `${cloud.duration}s`,
              animationDelay: `${cloud.delay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Glow Orbs */}
      <div
        className="glow-orb"
        style={{
          width: '600px',
          height: '600px',
          background: 'rgba(0,100,200,0.12)',
          top: '-200px',
          right: '-100px',
        }}
      ></div>
      <div
        className="glow-orb"
        style={{
          width: '400px',
          height: '400px',
          background: 'rgba(0,212,255,0.07)',
          bottom: '20%',
          left: '-100px',
        }}
      ></div>
    </>
  );
};

export default AnimatedBackground;
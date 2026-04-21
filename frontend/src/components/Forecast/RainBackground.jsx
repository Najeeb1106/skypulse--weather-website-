import React, { useEffect, useRef } from 'react';
import '../../styles/components/RainBackground.css';

const RainBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let animationFrameId;

    const drops = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 4 + Math.random() * 6,
      len: 10 + Math.random() * 20,
      op: 0.1 + Math.random() * 0.3
    }));

    const drawRain = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drops.forEach(d => {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 2, d.y + d.len);
        ctx.strokeStyle = `rgba(100,180,255,${d.op})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        
        d.y += d.speed;
        if (d.y > canvas.height) {
          d.y = -d.len;
          d.x = Math.random() * canvas.width;
        }
      });
      animationFrameId = requestAnimationFrame(drawRain);
    };

    drawRain();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas className="rain-canvas" id="rainCanvas" ref={canvasRef}></canvas>;
};

export default RainBackground;

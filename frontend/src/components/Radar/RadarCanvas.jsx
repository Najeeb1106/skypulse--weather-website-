import React, { useEffect, useRef } from 'react';
import '../../styles/components/RadarCanvas.css';

const RadarCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const storms = [];
    for (let i = 0; i < 8; i++) {
      storms.push({
        x: Math.random() * canvas.width, 
        y: Math.random() * canvas.height,
        r: 30 + Math.random() * 80,
        vx: (Math.random() - .5) * .3, 
        vy: (Math.random() - .5) * .3,
        col: ['rgba(0,212,255,', 'rgba(100,150,255,', 'rgba(0,180,120,'][Math.floor(Math.random() * 3)],
        op: 0.1 + Math.random() * 0.25, 
        phase: Math.random() * Math.PI * 2
      });
    }

    let t = 0;
    const draw = () => {
      t += 0.008;
      ctx.fillStyle = '#020a14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(0,80,140,0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
      for (let y = 0; y < canvas.height; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }

      const continents = [
        {pts: [[.12,.25],[.22,.15],[.3,.18],[.32,.35],[.25,.45],[.13,.42]], col: 'rgba(15,35,65,0.9)'},
        {pts: [[.38,.18],[.55,.15],[.65,.22],[.68,.4],[.6,.5],[.42,.48],[.36,.35]], col: 'rgba(12,30,60,0.9)'},
        {pts: [[.55,.45],[.68,.42],[.75,.55],[.7,.68],[.56,.65]], col: 'rgba(10,28,55,0.9)'},
        {pts: [[.7,.2],[.85,.18],[.88,.35],[.82,.42],[.72,.38]], col: 'rgba(14,32,62,0.9)'},
        {pts: [[.82,.52],[.95,.5],[.96,.7],[.85,.75],[.78,.65]], col: 'rgba(12,28,56,0.9)'},
      ];
      continents.forEach(c => {
        ctx.beginPath();
        c.pts.forEach((p, i) => {
          const x = p[0] * canvas.width, y = p[1] * canvas.height;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fillStyle = c.col; ctx.fill();
        ctx.strokeStyle = 'rgba(0,100,200,0.2)'; ctx.lineWidth = 1; ctx.stroke();
      });

      storms.forEach(s => {
        s.x += s.vx; s.y += s.vy;
        if (s.x < -s.r) s.x = canvas.width + s.r;
        if (s.x > canvas.width + s.r) s.x = -s.r;
        if (s.y < -s.r) s.y = canvas.height + s.r;
        if (s.y > canvas.height + s.r) s.y = -s.r;
        const pulse = Math.sin(t * 2 + s.phase) * 0.3 + 0.7;
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * pulse);
        g.addColorStop(0, s.col + (s.op * 1.5) + ')');
        g.addColorStop(0.5, s.col + (s.op * 0.6) + ')');
        g.addColorStop(1, s.col + '0)');
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
      });

      const hx = canvas.width * .3, hy = canvas.height * .55;
      for (let i = 0; i < 3; i++) {
        const ar = 20 + i * 25, ao = (t * (.5 + i * .2)) % (Math.PI * 2);
        ctx.beginPath();
        for (let a = ao; a < ao + Math.PI * 1.5; a += 0.05) {
          const r = ar * (a - ao + .1) * .4;
          const x2 = hx + Math.cos(a) * r, y2 = hy + Math.sin(a) * r;
          a === ao ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2);
        }
        ctx.strokeStyle = `rgba(255,107,53,${0.4 - i * .1})`; ctx.lineWidth = 2 - i * .5; ctx.stroke();
      }
      ctx.beginPath(); ctx.arc(hx, hy, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,107,53,0.8)'; ctx.fill();
      ctx.beginPath(); ctx.arc(hx, hy, 14, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,107,53,0.4)'; ctx.lineWidth = 1; ctx.stroke();

      const scanY = ((t * 30) % canvas.height);
      const sg = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 2);
      sg.addColorStop(0, 'rgba(0,212,255,0)'); sg.addColorStop(1, 'rgba(0,212,255,0.04)');
      ctx.fillStyle = sg; ctx.fillRect(0, scanY - 30, canvas.width, 32);

      ctx.strokeStyle = 'rgba(0,150,200,0.06)'; ctx.lineWidth = 1;
      for (let lng = -180; lng <= 180; lng += 30) {
        const x = (lng + 180) / 360 * canvas.width;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        ctx.fillStyle = 'rgba(0,150,200,0.3)'; ctx.font = '9px DM Mono,monospace';
        ctx.fillText(lng + '°', x + 2, 12);
      }
      for (let lat = -90; lat <= 90; lat += 30) {
        const y = (90 - lat) / 180 * canvas.height;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        ctx.fillStyle = 'rgba(0,150,200,0.3)'; ctx.font = '9px DM Mono,monospace';
        ctx.fillText(lat + '°', 2, y - 2);
      }

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="worldMap" className="map-canvas"></canvas>;
};

export default RadarCanvas;

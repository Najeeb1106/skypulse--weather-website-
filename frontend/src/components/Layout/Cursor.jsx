import React, { useEffect, useRef } from 'react';
import '../../styles/components/Cursor.css';

const Cursor = () => {
  // We use refs to grab the DOM elements directly
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  
  // We use refs to store positions without triggering re-renders
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // 1. Update the target mouse coordinates on mouse move
    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    let animationFrameId;

    // 2. The animation loop
    const render = () => {
      const { x: mx, y: my } = mousePos.current;
      
      // Instantly move the solid cursor dot
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mx - 5}px, ${my - 5}px, 0)`;
      }

      // Calculate the easing/delay for the outer ring
      ringPos.current.x += (mx - ringPos.current.x) * 0.12;
      ringPos.current.y += (my - ringPos.current.y) * 0.12;

      // Move the ring
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px, 0)`;
      }

      // Loop it for the next frame
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // 3. Cleanup when the component unmounts
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>
    </>
  );
};

export default Cursor;
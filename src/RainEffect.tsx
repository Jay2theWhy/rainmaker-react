import React, { useRef, useEffect } from 'react';
import './RainEffect.css';

interface Particle {
    x: number;
    y: number;
    l: number;
    xs: number;
    ys: number;
  }

function RainEffect() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return; 
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);
    
        // Canvas styles
        const setCanvasStyles = () => {
            ctx.strokeStyle = 'rgba(174,194,224,1)';
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';
        };
        setCanvasStyles();
    
        // Initialize particles
        const maxParts = 1000;
        const particles: Particle[] = [];
        for (let i = 0; i < maxParts; i++) {
          particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            l: Math.random(),
            xs: -4 + Math.random() * 4 + 2,
            ys: Math.random() * 10 + 10,
          });
        }
    
        // Animation functions
        const draw = () => {
          ctx.clearRect(0, 0, w, h);
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
            ctx.stroke();
          }
          move();
        };
    
        const move = () => {
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.xs;
            p.y += p.ys;
            if (p.x > w || p.y > h) {
              p.x = Math.random() * w;
              p.y = -20;
            }
          }
        };

        const fallingSpeed: number = 30;
        const interval = 1000 / fallingSpeed;
        let lastTime = performance.now();
    
        let animationFrameId: number;
        const render = (now: number) => {
          animationFrameId = requestAnimationFrame(render);
          const delta: number = now - lastTime;
          if (delta >= interval) {
            lastTime = now - (delta % interval);
            draw();
          }
        };

        // render();
        animationFrameId = requestAnimationFrame(render);
    
        // Handle window resize
        const handleResize = () => {
          w = canvas.width = window.innerWidth;
          h = canvas.height = window.innerHeight;
          setCanvasStyles();
        };
        window.addEventListener('resize', handleResize);
    
        // Cleanup on unmount
        return () => {
          cancelAnimationFrame(animationFrameId);
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      return <canvas ref={canvasRef} />;
    };

    export default RainEffect;
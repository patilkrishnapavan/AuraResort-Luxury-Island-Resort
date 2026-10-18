import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speed: number;
  twinkleOffset: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const starCount = Math.floor((width * height) / 8000);
    const stars: Star[] = [];
    const particles: Particle[] = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    const spawnParticle = () => {
      particles.push({
        x: Math.random() * width,
        y: height + 10,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.4 + 0.15),
        radius: Math.random() * 2 + 0.5,
        opacity: 0,
        life: 0,
        maxLife: Math.random() * 300 + 200,
      });
    };

    let frame = 0;
    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Stars
      for (const star of stars) {
        const twinkle = Math.sin(frame * star.speed + star.twinkleOffset);
        const alpha = star.opacity * (0.4 + 0.6 * ((twinkle + 1) / 2));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249, 168, 212, ${alpha})`;
        ctx.fill();

        if (star.radius > 1) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 3);
          grad.addColorStop(0, `rgba(236, 72, 153, ${alpha * 0.3})`);
          grad.addColorStop(1, 'rgba(236, 72, 153, 0)');
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }

      // Floating pink particles
      if (frame % 20 === 0 && particles.length < 40) {
        spawnParticle();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.opacity = Math.sin((p.life / p.maxLife) * Math.PI) * 0.5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(236, 72, 153, ${p.opacity})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(236, 72, 153, ${p.opacity * 0.15})`;
        ctx.fill();

        if (p.life >= p.maxLife || p.y < -20) {
          particles.splice(i, 1);
        }
      }

      frame++;
      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

import { useEffect, useRef } from 'react';
import { useMouseParallax } from '../hooks/useMouseParallax';

// Generate stable particle data once
const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 1,
  x: Math.random() * 100,
  delay: Math.random() * 20,
  duration: 15 + Math.random() * 25,
  color: ['#00F5D4', '#00D9FF', '#8B5CF6', '#ffffff'][Math.floor(Math.random() * 4)],
  opacity: 0.3 + Math.random() * 0.5,
}));

export default function CosmicBackground() {
  const mouse = useMouseParallax();
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (layer1Ref.current) {
      layer1Ref.current.style.transform = `translate(${mouse.x * -8}px, ${mouse.y * -8}px)`;
    }
    if (layer2Ref.current) {
      layer2Ref.current.style.transform = `translate(${mouse.x * -18}px, ${mouse.y * -18}px)`;
    }
    if (layer3Ref.current) {
      layer3Ref.current.style.transform = `translate(${mouse.x * -30}px, ${mouse.y * -30}px)`;
    }
  }, [mouse.x, mouse.y]);

  return (
    <div className="cosmic-bg" aria-hidden="true">
      {/* Aurora bands */}
      <div className="aurora-1" />
      <div className="aurora-2" />
      <div className="aurora-3" />

      {/* Layer 1 — Far stars (slow parallax) */}
      <div ref={layer1Ref} className="absolute inset-0 transition-transform duration-300 ease-out">
        <div className="star-field-1 absolute inset-0" />
        <div className="star-field-2 absolute inset-0" />
        <div className="nebula-orb nebula-1" />
        <div className="nebula-orb nebula-2" />
      </div>

      {/* Layer 2 — Mid stars + nebula orbs (medium parallax) */}
      <div ref={layer2Ref} className="absolute inset-0 transition-transform duration-200 ease-out">
        <div className="star-field-3 absolute inset-0" />
        <div className="nebula-orb nebula-3" />
        <div className="nebula-orb nebula-4" />
      </div>

      {/* Layer 3 — Foreground sparkles (fast parallax) */}
      <div ref={layer3Ref} className="absolute inset-0 transition-transform duration-150 ease-out">
        {/* Bright foreground stars */}
        <div
          className="absolute rounded-full"
          style={{
            width: 4, height: 4,
            top: '15%', left: '25%',
            background: '#00F5D4',
            boxShadow: '0 0 8px #00F5D4, 0 0 16px rgba(0,245,212,0.5)',
            animation: 'star-twinkle-1 3s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 5, height: 5,
            top: '60%', left: '70%',
            background: '#8B5CF6',
            boxShadow: '0 0 10px #8B5CF6, 0 0 20px rgba(139,92,246,0.5)',
            animation: 'star-twinkle-2 4s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 4, height: 4,
            top: '80%', left: '15%',
            background: '#00D9FF',
            boxShadow: '0 0 8px #00D9FF, 0 0 16px rgba(0,217,255,0.5)',
            animation: 'star-twinkle-1 5s ease-in-out infinite 2s',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 3, height: 3,
            top: '35%', left: '85%',
            background: '#00F5D4',
            boxShadow: '0 0 6px #00F5D4, 0 0 12px rgba(0,245,212,0.4)',
            animation: 'star-twinkle-2 6s ease-in-out infinite 1s',
          }}
        />
      </div>

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

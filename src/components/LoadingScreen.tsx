import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Start fade-out after 2.2s
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2200);

    // Remove from DOM after fade animation
    const removeTimer = setTimeout(() => {
      setShow(false);
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  if (!show) return null;

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      {/* Background stars */}
      <div className="star-field-1 absolute inset-0 pointer-events-none" />
      <div className="star-field-2 absolute inset-0 pointer-events-none" />

      {/* Glowing ring around logo */}
      <div
        className="absolute rounded-full border border-cosmic-teal/20"
        style={{
          width: 160, height: 160,
          boxShadow: '0 0 40px rgba(0,245,212,0.2), inset 0 0 40px rgba(0,245,212,0.05)',
          animation: 'spin 8s linear infinite',
        }}
      />
      <div
        className="absolute rounded-full border border-cosmic-purple/30"
        style={{
          width: 220, height: 220,
          boxShadow: '0 0 60px rgba(139,92,246,0.15)',
          animation: 'spin 12s linear infinite reverse',
        }}
      />

      {/* Orbital dots */}
      <div
        className="absolute"
        style={{
          width: 160, height: 160,
          animation: 'spin 4s linear infinite',
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cosmic-teal"
          style={{ boxShadow: '0 0 10px #00F5D4, 0 0 20px rgba(0,245,212,0.5)' }}
        />
      </div>

      {/* Main logo */}
      <div className="loading-logo z-10">MK</div>

      {/* Progress bar */}
      <div className="loading-bar-track z-10">
        <div className="loading-bar-fill" />
      </div>

      {/* Status text */}
      <div className="loading-text z-10">INITIALIZING COSMOS...</div>
    </div>
  );
}

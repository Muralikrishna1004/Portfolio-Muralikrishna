import { useRef, useCallback, ReactNode } from 'react';
import { useTheme } from '../context/ThemeContext';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glowColor?: string;
  onClick?: () => void;
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 10,
  scale = 1.02,
  glowColor = 'rgba(0,217,255,0.15)',
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      
      // Calculate cursor position within card (pixels)
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${mouseX}px`);
      card.style.setProperty('--mouse-y', `${mouseY}px`);

      // Calculate tilt angles
      const x = (mouseX / rect.width - 0.5) * 2;
      const y = (mouseY / rect.height - 0.5) * 2;
      card.style.transform = `perspective(1000px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) scale(${scale})`;
      
      // Dynamic neon outer box shadow
      card.style.boxShadow = `0 15px 35px -5px rgba(0,0,0,0.35), 0 0 20px ${glowColor}`;
    },
    [maxTilt, scale, glowColor]
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    card.style.boxShadow = '';
    card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
    setTimeout(() => {
      if (card) card.style.transition = '';
    }, 500);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden transition-all duration-300 group/card ${className}`}
      style={{ 
        willChange: 'transform', 
        transition: 'transform 0.1s ease-out',
        cursor: onClick ? 'pointer' : 'default',
        // Single-element Vercel gradient border effect!
        border: '1.5px solid transparent',
        backgroundImage: isDark
          ? `linear-gradient(#070913, #070913), radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${glowColor.replace('0.15', '0.6').replace('0.3', '0.7')}, transparent 80%)`
          : `linear-gradient(#ffffff, #ffffff), radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${glowColor.replace('0.15', '0.5').replace('0.3', '0.6')}, transparent 80%)`,
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
      }}
    >
      {/* Spotlight overlay inside card background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(220px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${glowColor}, transparent 80%)`,
        }}
      />

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}

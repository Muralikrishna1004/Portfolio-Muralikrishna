import { useRef, useCallback, ReactNode } from 'react';

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
  maxTilt = 12,
  scale = 1.03,
  glowColor = 'rgba(139,92,246,0.3)',
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      card.style.transform = `perspective(1000px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) scale(${scale})`;
      card.style.boxShadow = `0 20px 60px ${glowColor}, 0 0 30px ${glowColor}`;
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
      className={`tilt-card ${className}`}
      style={{ willChange: 'transform', transition: 'transform 0.1s ease-out' }}
    >
      <div className="tilt-card-inner w-full h-full">
        {children}
      </div>
    </div>
  );
}

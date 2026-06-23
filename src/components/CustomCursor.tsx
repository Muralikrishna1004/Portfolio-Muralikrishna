import { useEffect, useRef, useState } from 'react';

interface TrailDot {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

let trailId = 0;
const TRAIL_COLORS = ['#00F5D4', '#00D9FF', '#8B5CF6'];

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const posRef = useRef({ x: -100, y: -100 });
  const frameRef = useRef<number>(0);
  const lastTrailTime = useRef(0);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      // Add trail dots at intervals
      const now = Date.now();
      if (now - lastTrailTime.current > 40) {
        lastTrailTime.current = now;
        const dot: TrailDot = {
          id: trailId++,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 4 + 2,
          color: TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)],
        };
        setTrail((prev) => [...prev.slice(-14), dot]);
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest('a, button, [role="button"], input, textarea, select, label') !== null;
      setIsHovering(isInteractive);
    };

    // Animate cursor position with RAF for smoothness
    const animateCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${posRef.current.x}px`;
        cursorRef.current.style.top = `${posRef.current.y}px`;
      }
      frameRef.current = requestAnimationFrame(animateCursor);
    };

    frameRef.current = requestAnimationFrame(animateCursor);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  // Auto-remove trail dots
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTrail((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timeout);
  }, [trail]);

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
      />

      {/* Trail dots */}
      {trail.map((dot, i) => (
        <div
          key={dot.id}
          className="cursor-trail"
          style={{
            left: dot.x,
            top: dot.y,
            width: dot.size * (i / trail.length + 0.3),
            height: dot.size * (i / trail.length + 0.3),
            background: dot.color,
            boxShadow: `0 0 ${dot.size * 2}px ${dot.color}`,
            opacity: (i / trail.length) * 0.6,
          }}
        />
      ))}
    </>
  );
}

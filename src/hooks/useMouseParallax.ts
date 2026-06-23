import { useState, useEffect, useCallback } from 'react';

interface MousePosition {
  x: number; // -1 to 1 normalized
  y: number; // -1 to 1 normalized
  rawX: number;
  rawY: number;
}

export function useMouseParallax() {
  const [mouse, setMouse] = useState<MousePosition>({ x: 0, y: 0, rawX: 0, rawY: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;  // -1 to 1
    const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
    setMouse({ x, y, rawX: e.clientX, rawY: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return mouse;
}

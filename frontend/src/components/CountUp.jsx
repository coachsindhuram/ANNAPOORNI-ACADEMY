import React, { useEffect, useState, useRef } from 'react';
import { useScrollReveal } from '../utils/useScrollReveal';

/**
 * Animated number counter component that runs once triggered into viewport
 * @param {number} end - Target end number
 * @param {number} start - Starting number (default 0)
 * @param {number} duration - Animation duration in ms (default 2000)
 * @param {string} prefix - Optional prefix (e.g. "$", "+")
 * @param {string} suffix - Optional suffix (e.g. "+", "%", "k")
 * @param {number} decimals - Number of decimal places (default 0)
 */
export default function CountUp({
  end,
  start = 0,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = ''
}) {
  const [containerRef, isRevealed] = useScrollReveal({ threshold: 0.2 });
  const [count, setCount] = useState(start);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!isRevealed || animatedRef.current) return;
    animatedRef.current = true;

    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(end);
      return;
    }

    let startTime = null;
    let animationFrameId = null;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = easeOutCubic(progress);
      
      const currentCount = start + (end - start) * easedProgress;
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isRevealed, end, start, duration]);

  const formattedValue = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString();

  return (
    <span ref={containerRef} className={className}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
}

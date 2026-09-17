import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight IntersectionObserver hook for triggering hardware-accelerated CSS animations.
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Visibility threshold to trigger reveal (default: 0.15)
 * @param {string} options.rootMargin - Margin around the root (default: '0px 0px -40px 0px')
 * @param {boolean} options.triggerOnce - Whether to only trigger once (default: true)
 * @returns {[React.RefObject, boolean]} [ref, isRevealed]
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -40px 0px',
  triggerOnce = true
} = {}) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      return;
    }

    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (triggerOnce) {
            observer.unobserve(currentRef);
          }
        } else if (!triggerOnce) {
          setIsRevealed(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isRevealed];
}

export default useScrollReveal;

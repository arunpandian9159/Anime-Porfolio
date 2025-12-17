import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

/**
 * Custom hook for intersection-based animations
 * Reduces boilerplate across components
 * 
 * @param {Object|Function} animationConfig - Animation config object or function that receives the element
 * @param {Object} options - IntersectionObserver options
 * @returns {React.RefObject} - Ref to attach to the target element
 */
export const useIntersectionAnimate = (animationConfig, options = {}) => {
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            requestAnimationFrame(() => {
              if (typeof animationConfig === 'function') {
                animationConfig(element);
              } else {
                animate(element, animationConfig);
              }
            });
            
            if (!options.repeat) {
              observer.unobserve(element);
            }
          }
        });
      },
      { threshold: options.threshold ?? 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [animationConfig, options.threshold, options.repeat]);

  return ref;
};

/**
 * Custom hook for section header animations
 * Standardizes the common section header animation pattern
 * 
 * @param {string} headerClass - CSS class prefix for the header (e.g., 'about-header')
 * @returns {React.RefObject} - Ref to attach to the section element
 */
export const useSectionHeaderAnimation = (headerClass) => {
  const runAnimations = () => {
    animate(`${headerClass} .section-tag`, {
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 300,
      easing: 'easeOutExpo'
    });
    animate(`${headerClass} .section-title`, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 400,
      delay: 100,
      easing: 'easeOutExpo'
    });
    animate(`${headerClass} .title-decoration`, {
      width: [0, 80],
      duration: 300,
      delay: 200,
      easing: 'easeOutExpo'
    });
  };

  return useIntersectionAnimate(runAnimations);
};

/**
 * Custom hook for card reveal animations with stagger support
 * 
 * @param {number} index - Index of the card for stagger delay calculation
 * @param {Object} animationOverrides - Override default animation config
 * @returns {React.RefObject} - Ref to attach to the card element
 */
export const useCardReveal = (index = 0, animationOverrides = {}) => {
  const defaultConfig = {
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 300,
    delay: index * 50,
    easing: 'easeOutExpo',
    ...animationOverrides
  };

  return useIntersectionAnimate(defaultConfig);
};

/**
 * Optimized count-up animation hook
 * Uses direct anime.js import instead of dynamic imports
 */
export const useCountUp = (targetValue, duration = 1000) => {
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            requestAnimationFrame(() => {
              animate(element, {
                duration,
                easing: 'easeInOutExpo',
                onUpdate: (self) => {
                  // Calculate progress (0 to 1)
                  const progress = self.currentTime / self.duration;
                  element.textContent = Math.round(targetValue * progress);
                },
                onComplete: () => {
                  // Ensure final value is exactly the target
                  element.textContent = targetValue;
                }
              });
            });
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [targetValue, duration]);

  return ref;
};

export { animate };

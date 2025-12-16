import { useEffect, useRef } from 'react';
import anime from 'animejs';

export const useAnimeOnView = (animationConfig, options = {}) => {
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
            anime({
              targets: element,
              ...animationConfig,
            });
            if (!options.repeat) {
              observer.unobserve(element);
            }
          }
        });
      },
      { threshold: options.threshold || 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [animationConfig, options]);

  return ref;
};

export const useCountUp = (targetValue, duration = 2000) => {
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
            anime({
              targets: { value: 0 },
              value: targetValue,
              round: 1,
              duration,
              easing: 'easeInOutExpo',
              update: (anim) => {
                element.textContent = Math.round(anim.animations[0].currentValue);
              },
            });
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [targetValue, duration]);

  return ref;
};

export default anime;

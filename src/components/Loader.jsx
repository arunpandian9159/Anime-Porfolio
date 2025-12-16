import { useState, useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const [isHidden, setIsHidden] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const letters = document.querySelectorAll('.loader-letter');
    const progress = document.querySelector('.loader-progress');

    // Step 1: Animate letters with bounce effect (0ms - 800ms)
    animate(letters, {
      opacity: [0, 1],
      translateY: [50, 0],
      scale: [0.5, 1.1, 1],
      rotate: [-15, 0],
      delay: stagger(120),
      duration: 600,
      easing: 'easeOutElastic(1, .6)'
    });

    // Step 2: Glow pulse on letters (starts at 800ms)
    setTimeout(() => {
      animate(letters, {
        textShadow: [
          '0 0 20px rgba(230, 57, 70, 0.5)',
          '0 0 60px rgba(230, 57, 70, 1)',
          '0 0 20px rgba(230, 57, 70, 0.5)'
        ],
        duration: 800,
        easing: 'easeInOutSine'
      });
    }, 800);

    // Step 3: Animate progress bar (starts at 300ms, runs for 1500ms)
    setTimeout(() => {
      animate(progress, {
        width: '100%',
        duration: 1500,
        easing: 'easeInOutQuart'
      });
    }, 300);

    // Step 4: Exit animation - letters fly out (at 2200ms)
    setTimeout(() => {
      animate(letters, {
        opacity: [1, 0],
        translateY: [0, -50],
        scale: [1, 1.5],
        delay: stagger(60, { from: 'center' }),
        duration: 400,
        easing: 'easeOutExpo'
      });
    }, 2200);

    // Step 5: Fade out loader (at 2400ms)
    setTimeout(() => {
      animate(loaderRef.current, {
        opacity: [1, 0],
        duration: 500,
        easing: 'easeOutQuart'
      });
    }, 2400);

    // Step 6: Hide and callback (at 3000ms = 3 seconds total)
    setTimeout(() => {
      setIsHidden(true);
      onComplete?.();
    }, 3000);

  }, [onComplete]);

  if (isHidden) return null;

  return (
    <div ref={loaderRef} className="loader">
      <div className="text-center relative z-10">
        <div className="flex gap-3 justify-center mb-10">
          {'ARUN'.split('').map((letter, i) => (
            <span key={i} className="loader-letter">{letter}</span>
          ))}
        </div>
        <div className="w-64 h-2 bg-oxford-navy/50 rounded-full overflow-hidden mx-auto border border-frosted-blue/20">
          <div className="loader-progress h-full"></div>
        </div>
        <p className="text-frosted-blue/60 text-sm mt-5 tracking-widest uppercase">Loading Portfolio...</p>
      </div>
    </div>
  );
};

export default Loader;

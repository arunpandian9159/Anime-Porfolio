import { useState, useEffect, useRef } from 'react';
import anime from 'animejs';

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const letters = document.querySelectorAll('.loader-letter');
    const progress = document.querySelector('.loader-progress');

    // Animate letters
    anime({
      targets: letters,
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(100),
      duration: 600,
      easing: 'easeOutExpo'
    });

    // Animate progress bar
    anime({
      targets: progress,
      width: '100%',
      duration: 2000,
      easing: 'easeInOutQuart',
      complete: () => {
        anime({
          targets: loaderRef.current,
          opacity: 0,
          duration: 500,
          easing: 'easeOutExpo',
          complete: () => {
            setIsHidden(true);
            onComplete?.();
          }
        });
      }
    });
  }, [onComplete]);

  if (isHidden) return null;

  return (
    <div ref={loaderRef} className="loader">
      <div className="text-center">
        <div className="flex gap-1 justify-center mb-8">
          {'ARUN'.split('').map((letter, i) => (
            <span key={i} className="loader-letter">{letter}</span>
          ))}
        </div>
        <div className="w-48 h-1 bg-oxford-navy rounded-sm overflow-hidden mx-auto">
          <div className="loader-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { animate, stagger } from "animejs";

const LOADER_NAME = "ARUN";

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const progressRef = useRef(null);
  const letterRefs = useRef([]);
  const [isHidden, setIsHidden] = useState(false);
  const hasRun = useRef(false);

  // Memoize letters array to avoid recreating on each render
  const letters = useMemo(() => LOADER_NAME.split(""), []);

  // Store refs for letters
  const setLetterRef = useCallback(
    (index) => (el) => {
      letterRefs.current[index] = el;
    },
    [],
  );

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const letterElements = letterRefs.current.filter(Boolean);
    const progress = progressRef.current;

    if (!letterElements.length || !progress) return;

    // Use requestAnimationFrame to batch animations and avoid forced reflows
    requestAnimationFrame(() => {
      // Total animation: 1 second (1000ms)

      // Step 1: Animate letters with quick bounce effect (0ms - 300ms)
      animate(letterElements, {
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.7, 1.05, 1],
        delay: stagger(50),
        duration: 250,
        easing: "easeOutQuart",
      });

      // Step 2: Animate progress bar (0ms - 700ms)
      animate(progress, {
        width: "100%",
        duration: 800,
        easing: "easeInOutQuart",
      });

      // Step 3: Exit animation - fade out letters and loader (starts at 700ms)
      setTimeout(() => {
        animate(letterElements, {
          opacity: [1, 0],
          translateY: [0, -20],
          delay: stagger(30, { from: "center" }),
          duration: 300,
          easing: "easeOutQuart",
        });

        if (loaderRef.current) {
          animate(loaderRef.current, {
            opacity: [1, 0],
            duration: 300,
            easing: "easeOutQuart",
          });
        }
      }, 700);

      // Step 4: Hide and callback (at 1000ms = 1 second total)
      setTimeout(() => {
        setIsHidden(true);
        onComplete?.();
      }, 1000);
    });
  }, [onComplete]);

  if (isHidden) return null;

  return (
    <div ref={loaderRef} className="loader">
      <div className="text-center relative z-10">
        <div className="flex gap-3 justify-center mb-10">
          {letters.map((letter, i) => (
            <span key={i} ref={setLetterRef(i)} className="loader-letter">
              {letter}
            </span>
          ))}
        </div>
        <div className="w-64 h-2 bg-oxford-navy/50 rounded-full overflow-hidden mx-auto border border-frosted-blue/20">
          <div ref={progressRef} className="loader-progress h-full"></div>
        </div>
        <p className="text-frosted-blue/60 text-sm mt-5 tracking-widest uppercase">
          Loading Portfolio...
        </p>
      </div>
    </div>
  );
};

export default Loader;

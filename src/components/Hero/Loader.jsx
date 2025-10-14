import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";

const Loader = () => {
  const [percent, setPercent] = useState(0);
  const [slideUp, setSlideUp] = useState(false);
  const [unmount, setUnmount] = useState(false); 

  const requestRef = useRef(null);
  const startTimeRef = useRef(null);

  // 1. UPDATE THIS CONSTANT TO MATCH YOUR NEW SLOW CSS DURATION
  const SLIDE_UP_DURATION = 1500; // 1.5 seconds
  const INITIAL_DELAY = 400; // The delay after 100% before slide-up starts
  const LOADING_DURATION = useMemo(() => 2000, []); // 2s loading animation

  const animate = useCallback((time) => {
    if (!startTimeRef.current) startTimeRef.current = time;
    const elapsed = time - startTimeRef.current;

    const progress = Math.min(elapsed / LOADING_DURATION, 1);
    const currentPercent = Math.round(progress * 100);

    setPercent(prev => (prev !== currentPercent ? currentPercent : prev));

    if (progress < 1) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      // 1. Animation finished (100%) - START SLIDE UP
      setTimeout(() => setSlideUp(true), INITIAL_DELAY); 

      // 2. DELAY UNMOUNT: Wait for the slide-up transition to finish 
      //    (INITIAL_DELAY + SLIDE_UP_DURATION)
      setTimeout(() => {
        setUnmount(true);
      }, INITIAL_DELAY + SLIDE_UP_DURATION); 
    }
  }, [LOADING_DURATION]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  if (unmount) return null;

  return (
    <div
      // 3. UPDATE THE TAILWIND CLASS TO MATCH THE NEW DURATION (1500ms)
      className={`fixed inset-0 bg-[#F2F0EA] flex flex-col justify-end items-start min-h-screen min-w-full z-50 transition-transform duration-[${SLIDE_UP_DURATION}ms] ease-in-out
      ${slideUp ? "-translate-y-full pointer-events-none" : "translate-y-0 opacity-100"}`}
    >
      <div className="px-8 pb-8 w-full">
        <span className="text-black text-7xl font-normal leading-none select-none">
          {percent}%
        </span>
        <div className="mt-6 w-full h-[2px] bg-gray-300 relative overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-black"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
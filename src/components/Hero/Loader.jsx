import React, { useEffect, useRef, useState } from "react";

const Loader = () => {
  const [percent, setPercent] = useState(0);
  const [slideUp, setSlideUp] = useState(false);

  const requestRef = useRef(null);
  const startTimeRef = useRef(null);

  const duration = 2000; // 2s animation

  const animate = (time) => {
    if (!startTimeRef.current) startTimeRef.current = time;
    const elapsed = time - startTimeRef.current;

    let progress = Math.min(elapsed / duration, 1);
    let currentPercent = Math.round(progress * 100);

    // Update only if percent actually changed (to reduce React re-renders)
    setPercent((prev) => (prev !== currentPercent ? currentPercent : prev));

    if (progress < 1) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      // animation finished
      setTimeout(() => setSlideUp(true), 400);
    }
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-[#F2F0EA] flex flex-col justify-end items-start min-h-screen min-w-full z-50 transition-transform duration-700
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

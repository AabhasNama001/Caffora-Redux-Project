
// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { Link } from "react-router-dom";

// export default function FooterTitle() {
//   const cursorRef = useRef(null);
//   const textRef = useRef(null);

//   useEffect(() => {
//     const cursor = cursorRef.current;
//     const textEl = textRef.current;

//     // Mouse move event for smooth cursor follow
//     const moveHandler = (e) => {
//       gsap.to(cursor, {
//         x: e.clientX,
//         y: e.clientY,
//         duration: 0.7,
//         ease: "back.out",
//       });
//     };

//     window.addEventListener("mousemove", moveHandler);

//     // Hover animations for the text
//     const enterHandler = () => {
//       cursor.innerHTML = "GO TO";
//       gsap.to(cursor, { scale: 3, duration: 0.3, ease: "power3.out" });
//     };

//     const leaveHandler = () => {
//       cursor.innerHTML = "";
//       gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power3.out" });
//     };

//     textEl.addEventListener("mouseenter", enterHandler);
//     textEl.addEventListener("mouseleave", leaveHandler);

//     return () => {
//       window.removeEventListener("mousemove", moveHandler);
//       textEl.removeEventListener("mouseenter", enterHandler);
//       textEl.removeEventListener("mouseleave", leaveHandler);
//     };
//   }, []);

//   return (
//     <div className="relative w-[100%] h-screen  flex justify-center items-center ">
//       {/* Custom Cursor */}
//       <div
//         ref={cursorRef}
//         className="cursor fixed top-0 left-0 w-10 h-10 flex items-center justify-center 
//                    rounded-full bg-[#99804D] text-black text-[8px] font-bold pointer-events-none 
//                     z-50 text-center"
//       ></div>

//       {/* Main Text */}
//       <Link to='/'
//         ref={textRef}
//         className="text-[13vw] lg:text-[15vw] xl:text-[200px] 2xl:text-[222px] 
//                    leading-none text-gray-100 tracking-widest font-[cinzelDec] cursor-pointer"
//       >
//         Caffora
//       </Link>
//     </div>
//   );
// }

// mix-blend-difference



import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

export default function FooterTitle() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // ✅ Memoized GSAP configs (avoids recreating objects each render)
  const moveConfig = useMemo(
    () => ({ duration: 0.7, ease: "back.out" }),
    []
  );
  const scaleUpConfig = useMemo(
    () => ({ scale: 3, duration: 0.3, ease: "power3.out" }),
    []
  );
  const scaleDownConfig = useMemo(
    () => ({ scale: 1, duration: 0.3, ease: "power3.out" }),
    []
  );

  // ✅ Cursor move handler
  const moveHandler = useCallback(
    (e) => {
      if (!cursorRef.current) return;
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, ...moveConfig });
    },
    [moveConfig]
  );

  // ✅ Hover handlers
  const enterHandler = useCallback(() => {
    if (!cursorRef.current) return;
    cursorRef.current.textContent = "GO TO";
    gsap.to(cursorRef.current, scaleUpConfig);
  }, [scaleUpConfig]);

  const leaveHandler = useCallback(() => {
    if (!cursorRef.current) return;
    cursorRef.current.textContent = "";
    gsap.to(cursorRef.current, scaleDownConfig);
  }, [scaleDownConfig]);

  // ✅ Setup only when visible
  useEffect(() => {
    if (!isVisible) return;

    const cursor = cursorRef.current;
    const textEl = textRef.current;

    window.addEventListener("mousemove", moveHandler);
    textEl.addEventListener("mouseenter", enterHandler);
    textEl.addEventListener("mouseleave", leaveHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      textEl.removeEventListener("mouseenter", enterHandler);
      textEl.removeEventListener("mouseleave", leaveHandler);
    };
  }, [isVisible, moveHandler, enterHandler, leaveHandler]);

  // ✅ Lazy render with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-[100%] h-screen flex justify-center items-center"
    >
      {isVisible && (
        <>
          {/* Custom Cursor */}
          <div
            ref={cursorRef}
            className="cursor fixed top-0 left-0 w-10 h-10 flex items-center justify-center 
                       rounded-full bg-[#99804D] text-black text-[8px] font-bold pointer-events-none 
                       z-50 text-center"
          ></div>

          {/* Main Text */}
          <Link
            to="/"
            ref={textRef}
            className="text-[13vw] lg:text-[15vw] xl:text-[200px] 2xl:text-[222px] 
                       leading-none text-gray-100 tracking-widest font-[cinzelDec] cursor-pointer"
          >
            Caffora
          </Link>
        </>
      )}
    </div>
  );
}

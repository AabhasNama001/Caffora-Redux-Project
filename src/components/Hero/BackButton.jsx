import React, { useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const btnRef = useRef();
  const arrowRef = useRef();
  const sparkleRef = useRef();
  const navigate = useNavigate();
  const BackHandler = () => {
    navigate(-1)

  }

  const handleMouseEnter = () => {

    gsap.to(btnRef.current, {
      scale: 1.08,
      rotateX: 15,
      boxShadow: "0 8px 30px rgba(76,110,245,0.15)",
      duration: 0.3,
      ease: "back.out(1.7)",
    });

    gsap.fromTo(
      arrowRef.current,
      { x: -10, rotate: 0 },
      { x: 6, rotate: 18, duration: 0.4, ease: "elastic.out(1,0.6)" }
    );

    gsap.fromTo(
      btnRef.current,
      { backgroundPosition: "200% center" },
      { backgroundPosition: "0% center", duration: 0.8, ease: "power1.inOut" }
    );

    gsap.fromTo(
      sparkleRef.current,
      { x: -32, opacity: 0 },
      {
        x: 120,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => gsap.to(sparkleRef.current, { opacity: 0, duration: 0.2 }),
      }
    );
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, {
      scale: 1,
      rotateX: 0,
      boxShadow: "0 4px 16px rgba(76,110,245,0.07)",
      duration: 0.3,
      ease: "power2.inOut",
    });
    gsap.to(arrowRef.current, { x: 0, rotate: 0, duration: 0.3, ease: "power2.inOut" });
    gsap.to(btnRef.current, { backgroundPosition: "200% center", duration: 0.7, ease: "power1.in" });
  };

  return (
    <button
      onClick={BackHandler}
      ref={btnRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="
        group flex items-center gap-2 px-6 py-3 rounded-full
        relative overflow-hidden text-white
        font-bold text-lg shadow-xl
        bg-gradient-to-r from-[brown] via-[orange] to-[red]
        transition-transform duration-200
        active:scale-95 focus:outline-none
        min-w-[140px] cursor-pointer
      "
      style={{
        backgroundImage:
          "linear-gradient(110deg,brown 20%,orange 50%,red 80%)",
        backgroundSize: "200% auto",
        backgroundPosition: "200% center",
        boxShadow: "0 4px 16px rgba(76,110,245,0.07)",
        perspective: "220px",
      }}
    >
      <span>Shop</span>
      <i
        ref={arrowRef}
        className="ri-arrow-right-line text-xl transition-transform"
        style={{ display: "inline-block" }}
      />
      {/* Sparkle Effect */}
      <span
        ref={sparkleRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 pointer-events-none"
        aria-hidden="true"
        style={{
          filter: "drop-shadow(0 0 10px #fffcae)",
          opacity: 0,
        }}
      >
        <svg width="24" height="24" fill="none">
          <g>
            <circle cx="12" cy="12" r="4.4" fill="#fff" fillOpacity="0.82" />
            <circle cx="12" cy="12" r="3" fill="#ffe644" fillOpacity="0.84" />
          </g>
        </svg>
      </span>
    </button>
  );
};

export default BackButton;

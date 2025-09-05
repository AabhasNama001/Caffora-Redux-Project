// Categories.jsx
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CoffeeCup3D from "./CoffeeCup3D";

gsap.registerPlugin(ScrollTrigger);

export default function Categories() {
  const containerRef = useRef(null);
  const cat5Ref = useRef(null); // placeholder for cat5 (left image div)
  const [isDocked, setIsDocked] = useState(false);

  // shared motion object used by CoffeeCup3D (3D units)
  const motion = useRef({
    x: 0,
    y: 0,
    rotY: 0,
    tiltZ: 0,
    scale: 1,
  });

  const scrollAnim = useRef(null);
  const idleTl = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1) Scroll-driven animation (scrub)
    scrollAnim.current = gsap.to(motion.current, {
      y: -2,
      ease: "none",
      scrollTrigger: {
        id: "cupScroll",
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
      onUpdate: function () {
        if (!isDocked) {
          const progress = this.progress();
          motion.current.rotY = progress * Math.PI * 4; // 2 full rotations
          motion.current.tiltZ = Math.sin(progress * Math.PI) * 0.45;
          motion.current.scale = 1 - progress * 0.18;
        }
      },
    });

    // 2) Dock trigger for cat5
    const dockTrigger = ScrollTrigger.create({
      trigger: cat5Ref.current,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        if (scrollAnim.current) {
          // stop scroll updates completely
          scrollAnim.current.scrollTrigger.disable();
        }

        gsap.to(motion.current, {
          x: 0,
          y: 0,
          rotY: 0.1,
          tiltZ: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.inOut",
          onStart: () => setIsDocked(true),
          onComplete: () => {
            // idle breathing
            if (idleTl.current) idleTl.current.kill();
            idleTl.current = gsap.timeline({ repeat: -1, yoyo: true });
            idleTl.current.to(motion.current, {
              scale: 1.03,
              tiltZ: 0.05,
              duration: 1.8,
              ease: "sine.inOut",
            });
          },
        });
      },

      onLeaveBack: () => {
        if (idleTl.current) idleTl.current.kill();
        setIsDocked(false);

        if (scrollAnim.current) {
          scrollAnim.current.scrollTrigger.disable(); // fully stop updates
        }

        gsap.to(motion.current, {
          x: 0,
          y: -2,
          rotY: motion.current.rotY + Math.PI / 2,
          tiltZ: 0.25,
          scale: 0.92,
          duration: 1.4, // smoother
          ease: "power2.inOut",
          onComplete: () => {
            // now safely re-enable scroll syncing
            if (scrollAnim.current) {
              scrollAnim.current.scrollTrigger.enable();
              scrollAnim.current.scrollTrigger.refresh();
            }
          },
        });
      },
    });

    return () => {
      scrollAnim.current?.scrollTrigger?.kill();
      scrollAnim.current?.kill();
      dockTrigger.kill();
      idleTl.current?.kill();
    };
  }, [isDocked]);

  // ✨ Extra flavour: subtle parallax hover when docked + drag rotate
  useEffect(() => {
    if (!isDocked) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentRotY = motion.current.rotY;
    let currentTiltZ = motion.current.tiltZ;
    let spinReq;
    let spinActive = true; // auto spin flag
    let resumeTimeout;

    const spinLoop = () => {
      if (spinActive && !isDragging) {
        motion.current.rotY += 0.01; // slow spin
      }
      spinReq = requestAnimationFrame(spinLoop);
    };
    spinLoop();
    const handleDown = (e) => {
      isDragging = true;
      spinActive = false; // pause spin while dragging
      startX = e.clientX;
      startY = e.clientY;
      currentRotY = motion.current.rotY;
      currentTiltZ = motion.current.tiltZ;
      if (resumeTimeout) clearTimeout(resumeTimeout);
    };

    const handleMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      const rotSpeed = 0.005;
      const tiltSpeed = 0.005;

      gsap.to(motion.current, {
        rotY: currentRotY + dx * rotSpeed,
        tiltZ: currentTiltZ + dy * tiltSpeed,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleUp = () => {
      if (!isDragging) return;
      isDragging = false;

      gsap.to(motion.current, {
        tiltZ: 0.05,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)",
      });

      // resume auto spin after delay
      resumeTimeout = setTimeout(() => {
        spinActive = true;
      }, 2000);
    };

    const box = cat5Ref.current;
    box.addEventListener("mousedown", handleDown);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);

    return () => {
      box.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      cancelAnimationFrame(spinReq);
      if (resumeTimeout) clearTimeout(resumeTimeout);
    };
  }, [isDocked]);

  return (
    <div ref={containerRef} className="relative min-h-[300vh]">
      {/* Floating cup when not docked */}
      {!isDocked && (
        <div
          className="sticky top-10 z-[999] pointer-events-none flex justify-center"
          style={{ width: "100%" }}
        >
          <div style={{ width: 320, height: 320 }}>
            <CoffeeCup3D motion={motion} fillParent={false} />
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="mt-40 space-y-40 max-w-5xl mx-auto px-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <section
            key={i}
            className="flex flex-col md:flex-row items-center gap-8 bg-white/5 p-8 rounded-2xl shadow-lg backdrop-blur"
            style={{ border: "1px solid rgba(255,255,255,0.04)" }}
          >
            {/* Left - image/placeholder */}
            <div className="w-full md:w-1/2">
              {i === 5 ? (
                <div
                  ref={cat5Ref}
                  className="w-full h-[320px] rounded-xl bg-black/10 border border-dashed border-gray-500 flex items-center justify-center relative overflow-hidden"
                >
                  {isDocked ? (
                    <div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      style={{ padding: 16 }}
                    >
                      <CoffeeCup3D motion={motion} fillParent={true} />
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">
                      3D Cup will dock here (cat5 left)
                    </span>
                  )}
                </div>
              ) : (
                <img
                  src={`https://images.pexels.com/photos/437716/pexels-photo-437716.jpeg?text=Category+${i}`}
                  alt={`Category ${i}`}
                  className="rounded-xl w-full object-cover shadow-md"
                />
              )}
            </div>
            {/* Right - Text */}
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-semibold mb-3">
                {i === 5 ? "Category 5 (Dock Target)" : `Category ${i}`}
              </h3>
              <p className="text-gray-300 mb-4">
                {i === 5
                  ? "This category is specially built to receive the 3D cup — left area is empty so the cup will fit there when you scroll down."
                  : `Short description for category ${i}. Add products, images, or cards here.`}
              </p>
              <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:scale-105 transition-transform">
                Explore
              </button>
            </div>
          </section>
        ))}
        <div style={{ height: 500 }} />
      </div>
    </div>
  );
}
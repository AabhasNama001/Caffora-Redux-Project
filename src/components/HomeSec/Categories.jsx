import React, { useEffect, useRef, useState, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 🔥 Lazy load CoffeeCup3D
const CoffeeCup3D = React.lazy(() => import("./CoffeeCup3D"));

export default function Categories() {
  const containerRef = useRef(null);
  const cat5Ref = useRef(null);
  const [isDocked, setIsDocked] = useState(false);

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

    // Scroll-driven animation
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
          motion.current.rotY = progress * Math.PI * 4;
          motion.current.tiltZ = Math.sin(progress * Math.PI) * 0.45;
          motion.current.scale = 1 - progress * 0.18;
        }
      },
    });

    // Dock trigger
    const dockTrigger = ScrollTrigger.create({
      trigger: cat5Ref.current,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        if (scrollAnim.current) scrollAnim.current.scrollTrigger.disable();

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
        if (scrollAnim.current) scrollAnim.current.scrollTrigger.disable();

        gsap.to(motion.current, {
          x: 0,
          y: -2,
          rotY: motion.current.rotY + Math.PI / 2,
          tiltZ: 0.25,
          scale: 0.92,
          duration: 1.4,
          ease: "power2.inOut",
          onComplete: () => {
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

  // interactive drag effect (kept same)
  useEffect(() => {
    if (!isDocked) return;
    // ... (keep your drag logic here)
  }, [isDocked]);

  return (
    <div ref={containerRef} className="relative min-h-[300vh]">
      {/* Floating cup */}
      {!isDocked && (
        <div className="sticky top-10 z-[999] pointer-events-none flex justify-center w-full">
          <div className="w-80 h-80">
            <Suspense
              fallback={<div className="text-white">Loading cup...</div>}
            >
              <CoffeeCup3D motion={motion} fillParent={false} />
            </Suspense>
          </div>
        </div>
      )}

      {/* Categories List */}
      <div className="mt-40 space-y-40 max-w-5xl mx-auto px-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <section
            key={i}
            className="flex flex-col md:flex-row items-center gap-8 bg-white/5 p-8 rounded-2xl shadow-lg backdrop-blur border border-white/10"
          >
            <div className="w-full md:w-1/2">
              {i === 5 ? (
                <div
                  ref={cat5Ref}
                  className="w-full h-80 rounded-xl bg-black/10 border border-dashed border-gray-500 flex items-center justify-center relative overflow-hidden"
                >
                  {isDocked ? (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
                      <Suspense
                        fallback={<div className="text-white">Loading...</div>}
                      >
                        <CoffeeCup3D motion={motion} fillParent />
                      </Suspense>
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
                  loading="lazy"
                />
              )}
            </div>

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
        <div className="h-[500px]" />
      </div>
    </div>
  );
}

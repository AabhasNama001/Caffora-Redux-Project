import React, { Suspense, useMemo } from "react";
import Loader from "../components/Hero/Loader";
import HeroSection from "../components/Hero/HeroSection";
import CoffeeFeatures from "../components/HomeSec/CoffeeFeatures";
import Categories from "../components/HomeSec/Categories";
import CurvedLoop from "../components/HomeSec/CurvedLoop";
import cafforaImg from "../assets/images/Caffora.png";

// 🔥 Lazy loaded components
const BestSeller = React.lazy(() => import("../components/HomeSec/BestSeller"));
const ScrollReveal = React.lazy(() =>
  import("../components/HomeSec/ScrollReveal")
);
const CoffeeCup3D = React.lazy(() =>
  import("../components/HomeSec/CoffeeCup3D")
);

// 🔥 Small utility hook to load only when visible
const useOnScreen = (ref, rootMargin = "0px") => {
  const [isIntersecting, setIntersecting] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, rootMargin]);

  return isIntersecting;
};

const Home = () => {
  const bestSellerRef = React.useRef(null);
  const scrollRevealRef = React.useRef(null);

  const showBestSeller = useOnScreen(bestSellerRef, "100px");
  const showScrollReveal = useOnScreen(scrollRevealRef, "100px");

  // ✅ Memoize static props so CurvedLoop doesn’t re-render unnecessarily
  const curvedLoopProps = useMemo(
    () => ({
      marqueeText:
        "☕ Wake Up & Smell ✦ the Coffee — At Caffora, ☕ We Craft Moments, ✦ One Perfect Cup at a Time.",
      speed: 3,
      curveAmount: 150,
      direction: "right",
      interactive: true,
      className: "custom-text-style",
      cardClass: "h-[100px] sm:h-[150px] lg:h-[270px] bg-black",
    }),
    []
  );

  return (
    <div className="min-h-screen relative z-20">
      {/* Loader */}
      <Loader />

      {/* Hero Section */}
      <HeroSection />

      {/* Coffee Features */}
      <section>
        <CoffeeFeatures />
      </section>

      {/* Categories */}
      <Categories />

      {/* Best Seller (lazy load on scroll) */}
      <section ref={bestSellerRef}>
        <Suspense
          fallback={<div className="text-center py-10">Loading...</div>}
        >
          {showBestSeller && <BestSeller />}
        </Suspense>
      </section>

      {/* Curved Loop */}
      <CurvedLoop {...curvedLoopProps} />

      {/* Scroll Reveal Section */}
      <section
        ref={scrollRevealRef}
        className="relative h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${cafforaImg})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          {showScrollReveal && <ScrollReveal />}
        </Suspense>
      </section>

      {/* Example: CoffeeCup3D can be placed later and will only load when needed */}
      {/* <Suspense fallback={<div>Loading 3D...</div>}>
        <CoffeeCup3D />
      </Suspense> */}
    </div>
  );
};

export default Home;

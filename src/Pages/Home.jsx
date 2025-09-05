import React from "react";
import Loader from "../components/Hero/Loader";
import HeroSection from "../components/Hero/HeroSection";
import CoffeeFeatures from "../components/HomeSec/CoffeeFeatures";
import Categories from "../components/HomeSec/Categories";
import BestSeller from "../components/HomeSec/BestSeller";
import CurvedLoop from "../components/HomeSec/CurvedLoop";
import CoffeeCup3D from "../components/HomeSec/CoffeeCup3D"; // imported but not used (check if needed)
import ScrollReveal from "../components/HomeSec/ScrollReveal";

import cafforaImg from "../assets/images/Caffora.png";

const Home = () => {
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

      {/* Best Seller */}
      <section>
        <BestSeller />
      </section>

      {/* Curved Loop */}
      <CurvedLoop
        marqueeText="☕ Wake Up & Smell ✦ the Coffee — At Caffora, ☕ We Craft Moments, ✦ One Perfect Cup at a Time."
        speed={3}
        curveAmount={150}
        direction="right"
        interactive
        className="custom-text-style"
        cardClass="h-[100px] sm:h-[150px] lg:h-[270px] bg-black"
      />

      {/* Scroll Reveal Section */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${cafforaImg})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <ScrollReveal />
      </section>
    </div>
  );
};

export default Home;

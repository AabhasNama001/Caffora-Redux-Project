import React from "react";
import LiquidChrome from "./LiquidChrome";
import BackButton from "./BackButton";

const HeroSection = () => {
  return (
    <div className="h-screen relative">
      <LiquidChrome
        baseColor={[0.6, 0.5, 0.3]}
        speed={0.14}
        amplitude={0.6}
        interactive
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 max-w-xl mx-auto">
        <h2 className="text-3xl md:text-5xl mb-4 font-[cinzelBlack]">
          From Bean to Brew
        </h2>
        <p className="text-sm md:text-lg mb-6">
          Brewing more than coffee—sharing passion, craft, and the secrets to
          perfecting every cup at home.
        </p>
        <BackButton />
      </div>
    </div>
  );
};

// ✅ Memoized since it has no props
export default React.memo(HeroSection);

import React from 'react';
import LiquidChrome from './LiquidChrome';
import BackButton from './BackButton';

const HeroSection = () => {
  return (
    <div className="h-[100vh] relative">
      <LiquidChrome
        baseColor={[0.6, 0.5, 0.3]}
        speed={0.14}
        amplitude={0.6}
        interactive={true}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4 max-w-xl w-full ">
        <h2 className="text-3xl md:text-5xl mb-4 font-[cinzelBlack]">
          From Bean to Brew
        </h2>
        <p className="text-sm md:text-lg mb-6">
          Brewing more than coffee—sharing passion, craft, and the secrets to perfecting every cup at home.
        </p>
        <div className='flex justify-center '>
            <BackButton/>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

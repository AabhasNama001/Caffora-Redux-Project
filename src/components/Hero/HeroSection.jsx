// import React from 'react';
// import LiquidChrome from './LiquidChrome';
// import BackButton from './BackButton';

// const HeroSection = () => {
//   return (
//     <div className="h-[100vh] relative">
//       <LiquidChrome
//         baseColor={[0.6, 0.5, 0.3]}
//         speed={0.14}
//         amplitude={0.6}
//         interactive={true}
//       />
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4 max-w-xl w-full ">
//         <h2 className="text-3xl md:text-5xl mb-4 font-[cinzelBlack]">
//           From Bean to Brew
//         </h2>
//         <p className="text-sm md:text-lg mb-6">
//           Brewing more than coffee—sharing passion, craft, and the secrets to perfecting every cup at home.
//         </p>
//         <div className='flex justify-center '>
//             <BackButton/>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;



import React, { lazy, Suspense, useMemo } from 'react';

// Lazy load heavy components
const LiquidChrome = lazy(() => import('./LiquidChrome'));
const BackButton = lazy(() => import('./BackButton'));

const HeroSection = () => {
  // Memoize static props to prevent re-creation on each render
  const baseColor = useMemo(() => [0.6, 0.5, 0.3], []);

  return (
    <div className="h-[100vh] relative">
      <Suspense fallback={null}>
        <LiquidChrome
          baseColor={baseColor}
          speed={0.14}
          amplitude={0.6}
          interactive={true}
        />
      </Suspense>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4 max-w-xl w-full ">
        <h2 className="text-3xl md:text-5xl mb-4 font-[cinzelBlack]">
          From Bean to Brew
        </h2>
        <p className="text-sm md:text-lg mb-6">
          Brewing more than coffee—sharing passion, craft, and the secrets to perfecting every cup at home.
        </p>
        <div className='flex justify-center'>
          <Suspense fallback={null}>
            <BackButton />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

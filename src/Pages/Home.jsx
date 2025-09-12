// import React from 'react'
// import HeroSection from '../components/Hero/HeroSection'
// import Loader from '../components/Hero/Loader'

// import CoffeeFeatures from '../components/HomeSec/CoffeeFeatures'

// import Categories from '../components/HomeSec/Categories'

// import CurvedLoop from '../components/HomeSec/CurvedLoop'
// import CoffeeCup3D from '../components/HomeSec/CoffeeCup3D'
// import BestSeller from '../components/HomeSec/BestSeller'

// import ScrollReveal from '../components/HomeSec/ScrollReveal'
// import cafforaImg from '../assets/images/Caffora.png'

// const Home = () => {
//   return (
//     <div className='min-h-[100vh] relative z-20 '>
//       <Loader />
//       <HeroSection /> 

//       {/* //mt-1.5 */}
//       <div className=''>
//         <CoffeeFeatures />
//         {/* <CoffeeFeatures />
//         <CoffeeFeatures />
//         <CoffeeFeatures />
//         <CoffeeFeatures /> */}
//       </div>


//       <Categories />
//       <div>

//         <BestSeller />
//       </div>

//       <CurvedLoop
//         marqueeText={`☕ Wake Up & Smell ✦ the Coffee — At Caffora, ☕ We Craft   Moments, ✦ One Perfect Cup  at a Time. `}
//         speed={3}
//         curveAmount={150}
//         direction="right"
//         interactive={true}
//         className="custom-text-style"
//         cardClass="h-[100px] sm:h-[150px] lg:h-[270px] bg-black"
//       />


//       <div className='py-40 px-2 lg:p-40 relative bg-cover bg-no-repeat sm:bg-center bg-opacity-10
//     bg-[45%] h-[100vh] flex items-center justify-center' style={{ backgroundImage: `url(${cafforaImg})`  }}>
//       <div className="absolute inset-0 bg-black/50"></div>
//         <ScrollReveal/>

//       </div>


    
//     </div>
//   )
// }

// export default Home
// // Wake Up & Smell the Coffee — At Caffora, We Craft Moments, One Perfect Cup at a Time.






import React, { lazy, Suspense, useMemo } from 'react';
import Loader from '../components/Hero/Loader';
import cafforaImg from '../assets/images/Caffora.png';

// Lazy load heavy components
const HeroSection = lazy(() => import('../components/Hero/HeroSection'));
const CoffeeFeatures = lazy(() => import('../components/HomeSec/CoffeeFeatures'));
const Categories = lazy(() => import('../components/HomeSec/Categories'));
const CurvedLoop = lazy(() => import('../components/HomeSec/CurvedLoop'));
const CoffeeCup3D = lazy(() => import('../components/HomeSec/CoffeeCup3D'));
const BestSeller = lazy(() => import('../components/HomeSec/BestSeller'));
const ScrollReveal = lazy(() => import('../components/HomeSec/ScrollReveal'));

const Home = () => {

  // Memoize marqueeText so it doesn't get recreated on every render
  const marqueeText = useMemo(
    () => `☕ Wake Up & Smell ✦ the Coffee — At Caffora, ☕ We Craft Moments, ✦ One Perfect Cup at a Time. `,
    []
  );

  return (
    <div className='min-h-[100vh] relative z-20 '>
      <Loader />

      <Suspense fallback={<div>Loading Hero...</div>}>
        <HeroSection />
      </Suspense>

      <div className=''>
        <Suspense fallback={<div>Loading Features...</div>}>
          <CoffeeFeatures />
        </Suspense>
      </div>

      {/* <Suspense fallback={<div>Loading Categories...</div>}>
        <Categories />
      </Suspense> */}

      <div>
        <Suspense fallback={<div>Loading Best Seller...</div>}>
          <BestSeller />
        </Suspense>
      </div>

      <Suspense fallback={<div>Loading Marquee...</div>}>
        <CurvedLoop
          marqueeText={marqueeText}
          speed={3}
          curveAmount={150}
          direction="right"
          interactive={true}
          className="custom-text-style"
          cardClass="h-[100px] sm:h-[150px] lg:h-[270px] bg-black"
        />
      </Suspense>

      <div
        className='py-40 px-2 lg:p-40 relative bg-cover bg-no-repeat sm:bg-center bg-opacity-10
        bg-[45%] h-[100vh] flex items-center justify-center'
        style={{ backgroundImage: `url(${cafforaImg})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <Suspense fallback={<div>Loading Scroll Reveal...</div>}>
          <ScrollReveal />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;

import React from 'react'
import HeroSection from '../components/Hero/HeroSection'
import Loader from '../components/Hero/Loader'

import CoffeeFeatures from '../components/HomeSec2/CoffeeFeatures'

import Categories from '../components/HomeSec2/Categories'

const Home = () => {
  return (
    <div className='h-[400vh]'>
      {/* <Loader /> */}
      <HeroSection/>
      <div className='mt-1.5'>
        <CoffeeFeatures />
      </div>
      
     
      <Categories/>
    </div>
  )
}

export default Home
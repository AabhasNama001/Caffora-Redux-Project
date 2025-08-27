import React from 'react'
import HeroSection from '../components/Hero/HeroSection'
import Loader from '../components/Hero/Loader'

const Home = () => {
  return (
    <div className='h-[400vh]'>
      {/* <Loader /> */}
        <HeroSection/>
    </div>
  )
}

export default Home
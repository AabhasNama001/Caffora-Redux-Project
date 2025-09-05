import React from 'react'

import LiquidChrome from './components/Hero/LiquidChrome';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import MainRoutes from './Routes/MainRoutes';
import { Footer } from './components/Footer';



const App = () => {
  return (


    <div className="w-full h-screen relative">


      <Navbar />
      <MainRoutes />
      <Footer />

    </div>


  )
}

export default App





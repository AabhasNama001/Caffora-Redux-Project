import React from 'react'

import LiquidChrome from './components/Hero/LiquidChrome';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import MainRoutes from './Routes/MainRoutes';
import { Footer } from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { asyncCurrentUser } from './store/actions/userActions';



const App = () => {

  const dispatch = useDispatch();
  const {users} = useSelector((state)=> state.userReducer);
  useEffect(()=>{
    !users && dispatch(asyncCurrentUser());
  },[users])
  return (


    <div className="w-full h-[100%] relative">


      <Navbar />
      <MainRoutes />
      <div className='h-[100vh]'></div>
      <Footer />

    </div>


  )
}

export default App





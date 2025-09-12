import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from '../Pages/Home'
import About from '../Pages/About'
import Register from '../Pages/Register'
import Login from '../Pages/Login'
import AuthWrapper from './AuthWrapper'
import UnAuthWrapper from './UnAuthWrapper'

const MainRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<AuthWrapper><Home /></AuthWrapper>} />
                <Route path="/about" element={<About />} />
                {/* <Route path="/contact" element={<Contact />} /> */}
                <Route path="/register" element={<UnAuthWrapper><Register /></UnAuthWrapper>} />
                <Route path="/login" element={<UnAuthWrapper><Login /></UnAuthWrapper>} />
            </Routes>

        </div>
    )
}

export default MainRoutes
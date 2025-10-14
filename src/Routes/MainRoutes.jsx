    import React from 'react'
    import {Routes,Route} from 'react-router-dom'
    import Home from '../Pages/Home'
    import About from '../Pages/About'
    import Register from '../Pages/Register'
    import Login from '../Pages/Login'
    import AuthWrapper from './AuthWrapper'
    import UnAuthWrapper from './UnAuthWrapper'
    import Products from '../Pages/Products'
    import ProductPage from '../components/ProductPage'
    import CreateProduct from '../Pages/admin/CreateProduct'
    import Settings from '../Pages/Settings'
    import PageNotFound from '../Pages/PageNotFound'
import Cart from '../Pages/Cart'

    const MainRoutes = () => {
        return (
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<AuthWrapper><ProductPage /></AuthWrapper>} />
                    <Route path="/create-product" element={<AuthWrapper><CreateProduct /></AuthWrapper>} />
                    <Route path="/register" element={<UnAuthWrapper><Register /></UnAuthWrapper>} />
                    <Route path="/login" element={<UnAuthWrapper><Login /></UnAuthWrapper>} />
                    <Route path='/settings' element={<AuthWrapper><Settings/></AuthWrapper>}/>
                    <Route path='/cart' element={<AuthWrapper><Cart/></AuthWrapper>}/>
                    <Route path = '*'  element = {<PageNotFound/>}/>
                </Routes>

            </div>
        )
    }

    export default MainRoutes
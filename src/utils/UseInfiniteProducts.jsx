import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadLazyProduct } from '../store/reducers/productSlice';
import { useEffect } from 'react';
import axios from '../api/axiosconfig'
const UseInfiniteProducts = () => {
    const dispatch = useDispatch();
    const {products} = useSelector(state => state.productReducer);
    const [hasMore,sethasMore] = useState(true);
    const fetchProducts = async()=>{
        try{
            const {data} = await axios.get(`/products?_limit=6&_start=${products.length}`)
                if(data.length==0){
                    sethasMore(false);
                }else{
                    sethasMore(true);
                    dispatch(loadLazyProduct(data))
                }
        }catch(err){
            console.log(err)
        }
    }
    
    useEffect(()=>{
        fetchProducts();
    },[])

  return {products,hasMore,fetchProducts}
}

export default UseInfiniteProducts
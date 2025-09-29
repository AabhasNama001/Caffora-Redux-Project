import axios from '../../api/axiosconfig'
import { loadproduct } from '../reducers/productSlice'

export const asyncLoadProducts = ()=>async(dispatch,getState)=>{
    try{
        const {data} = await axios.get('/products')
        dispatch(loadproduct(data));
    }catch(err){
        console.log(err)
    }
}


export const asyncCreateProducts = (product)=>async(dispatch,getState)=>{
    try{
        await axios.post('/products',product);
        dispatch(asyncLoadProducts());
    }catch(err){
        console.log(err)
    }
}

export const asyncUpdateProducts = (id,product)=>async(dispatch,getState)=>{
    try{
        console.log(product)
        await axios.patch("/products/"+id,product);
        dispatch(asyncLoadProducts());
    }catch(err){
        console.log(err)
    }
}
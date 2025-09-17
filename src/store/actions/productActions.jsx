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
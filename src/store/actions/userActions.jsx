import axios from '../../api/axiosconfig'
import { loaduser } from '../reducers/userSlice';

export const asyncRegisterUser = (user) => async(dispatch,getState)=>{
    try{
        const res = await axios.post('/users',user);
    }
    catch(error){
        console.log(error)
    }
}

export const asyncLoginUser = (user) => async(dispatch,getState)=>{
    try{
        const {data} = await axios.get(`/users?email=${user.email}&password=${user.password}`);
        console.log(data[0])
        localStorage.setItem('user',JSON.stringify(data[0]));
        
        dispatch(asyncCurrentUser());
    }
    catch(error){
        console.log(error)
    }
}

export const asyncCurrentUser = ()=>async(dispatch,getState)=>{
    try {
        const user = JSON.parse(localStorage.getItem('user'))
        
        if(user) dispatch(loaduser(user));
        else {
            alert('user not loggedin !!');
        }
    } catch (error) {
        console.log(error);
    }
}
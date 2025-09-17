import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const ProductTemplate = ({product}) => {
    const dispatch = useDispatch();
    const users = useSelector((state)=>state.userReducer.users);


  return (
    <div className='w-[30%] h-[400px] mr-3 pb-3 border shadow bg-red-300' key={product.id}>
        <img className='w-full h-[30vh] object-cover' src={product.image} alt=''/>
        <h1>{product.title}</h1>
        <h1>{product.description.slice(0,10)}...</h1>
        <div>
            <p>{product.price}</p>
            <button>Add to Cart</button>
        </div>
        <Link>More Info</Link>
    </div>
  )
}

export default ProductTemplate
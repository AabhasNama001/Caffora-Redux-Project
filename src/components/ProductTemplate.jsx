import React from 'react'; // useState is not needed if only using group-hover
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsHeart } from 'react-icons/bs';
import { asyncUpdateUser } from '../store/actions/userActions';

const ProductTemplate = ({ product }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users); // users not used, can remove if not needed elsewhere


  const AddToCartHandler = (product)=>{

    const copyUser = { ...users, cart:[...users.cart]}
    const findProductInCart = copyUser.cart.findIndex((c)=> c?.product?.id === product.id)

    if(findProductInCart === -1){
      copyUser.cart.push({
        product,
        quantity:1
      }) 
    }
    else{
      copyUser.cart[findProductInCart] = {
        product,
        quantity: copyUser.cart[findProductInCart].quantity + 1
      }
    }
    dispatch(asyncUpdateUser(copyUser.id,copyUser))

  }
  return (
    <div className='w-[85vw] max-w-[500px] md:w-[340px]  md:h-[500px] lg:w-[420px] lg:h-[585px] mb-8 py-4 flex justify-center items-center flex-col md:px-2 '>
      <div className='relative w-fit h-full overflow-hidden group  '>
        {/* Default image (product.image[0]) */}
       
          <img
            className=' w-full md:h-fit  object-cover transition-opacity duration-300 group-hover:opacity-0'
            src={product.image[0]}
            alt={product.title}
          />

          {/* Hover image (product.image[1]) - positioned absolutely to overlay */}
          {/* Only render if product.image[1] exists */}
          {product.image[1] && (
            <img
              className='absolute inset-0  w-full  object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300'
              src={product.image[1]}
              alt={`${product.title} (hover)`}
            />
          )}
    


        {/* Wishlist Heart Icon (top right) */}
        {/* <div className='absolute top-3 right-3 z-10'> Added z-10 to ensure it's above images */}
        {/* <BsHeart className='text-gray-400 hover:text-black transition-colors duration-300 text-xl cursor-pointer' /> */}
        {/* </div> */}

        {/* Quick Add Button Overlay */}
        <div className='absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10'> {/* Added z-10 for button and overlay background */}
          {/* We'll use a semi-transparent background color here if needed, not a background image */}
          <div className='absolute inset-0  bg-opacity-50'></div> {/* Semi-transparent white overlay */}
          <button onClick={()=>{AddToCartHandler(product)}} className='absolute bottom-3 border-2 border-white text-sm px-6 py-2 bg-[#aa5607] text-white  opacity-0 md:translate-y-full md:group-hover:opacity-100 md:group-hover:translate-y-0 active:scale-[0.9] transition-all duration-300 z-20 cursor-pointer '> {/* Added z-20 for button to be above overlay */}
            Quick Add
          </button>
        </div>
      </div>

      <div className='w-full md:h-[200px]'>
        {/* Product Information */}
        <div className='flex justify-between items-center mt-2'>
          <h1 className='text-sm text-gray-500 font-light'>{product.category}</h1>
          {/* Removed duplicate BsHeart here, as it's already on the image */}
        </div>
         <Link  to={`/products/${product.id}`} className='cursor-pointer'>
        <h2 className='text-lg mt-2 font-black md:h-[60px] w-[95%] md:text-xl'>{product.title}</h2></Link>
        <p className='text-md font-semibold mt-1 md:text-lg'>
          Rs. {product.price } 
        </p>
        <button onClick={()=>{AddToCartHandler(product)}} className='md:hidden border-2 border-white text-sm px-6 py-2  mt-4 bg-[#aa5607] text-white active:scale-[0.9] transition-all duration-300 z-20 cursor-pointer '> {/* Added z-20 for button to be above overlay */}
          Quick Add
        </button>
      </div>
    </div>
  );
};

export default ProductTemplate;
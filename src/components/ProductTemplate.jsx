import React from 'react'; // useState is not needed if only using group-hover
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsHeart } from 'react-icons/bs';

const ProductTemplate = ({ product }) => {
  const dispatch = useDispatch();
  // const users = useSelector((state) => state.userReducer.users); // users not used, can remove if not needed elsewhere

  return (
    <div className='w-full sm:w-[32%] mb-8'>
      <div className='relative w-full overflow-hidden group'>
        {/* Default image (product.image[0]) */}
        <img
          className='w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-0'
          src={product.image[0]}
          alt={product.title}
        />

        {/* Hover image (product.image[1]) - positioned absolutely to overlay */}
        {/* Only render if product.image[1] exists */}
        {product.image[1] && (
          <img
            className='absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300'
            src={product.image[1]}
            alt={`${product.title} (hover)`}
          />
        )}


        {/* Wishlist Heart Icon (top right) */}
        <div className='absolute top-3 right-3 z-10'> {/* Added z-10 to ensure it's above images */}
          <BsHeart className='text-gray-400 hover:text-black transition-colors duration-300 text-xl cursor-pointer' />
        </div>

        {/* Quick Add Button Overlay */}
        <div className='absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10'> {/* Added z-10 for button and overlay background */}
          {/* We'll use a semi-transparent background color here if needed, not a background image */}
          <div className='absolute inset-0  bg-opacity-50'></div> {/* Semi-transparent white overlay */}
          <button className='absolute bottom-3 text-sm px-6 py-2 bg-black text-white rounded-full opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20'> {/* Added z-20 for button to be above overlay */}
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className='flex justify-between items-center mt-2'>
        <h1 className='text-sm text-gray-500 font-light'>Teaware</h1>
        {/* Removed duplicate BsHeart here, as it's already on the image */}
      </div>
      <h2 className='text-lg mt-2 font-medium'>{product.title}</h2>
      <p className='text-md font-bold mt-1'>
        Rs. {product.price}
      </p>
    </div>
  );
};

export default ProductTemplate;
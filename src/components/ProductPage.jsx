import React, { useState, useEffect } from 'react';
import { FaStar, FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch
import { useParams } from 'react-router-dom';
import { asyncLoadProducts } from '../store/actions/productActions'; // Assuming you have an action to fetch products
import UpdateProduct from '../Pages/admin/UpdateProduct';
import { asyncUpdateUser } from '../store/actions/userActions';

const ProductPage = () => {
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const dispatch = useDispatch(); // Get the dispatch function
    const { products, loading, error } = useSelector(state => state.productReducer);
    const user = useSelector(state => state.userReducer.users)
    // Fetch products when the component mounts
    useEffect(() => {
        // Dispatch the action to fetch products when the component first mounts
        dispatch(asyncLoadProducts());
    }, [dispatch]);// Add dispatch to the dependency array

    const product = products?.find((p) => p.id == id);
    console.log(product);

    const handleQuantityChange = (change) => {
        setQuantity(prev => Math.max(1, prev + change));
    };
    const AddToCartHandler = (product)=>{

        const copyUser = {...user, cart:[...user.cart]}

        const findProductInCart = copyUser.cart.findIndex((c)=>c?.product?.id == product.id)

        if(findProductInCart==-1){

            copyUser.cart.push({product,quantity})
        }
        else{
            copyUser.cart[findProductInCart] = {
                product,
                quantity: quantity
            }
        }
         dispatch(asyncUpdateUser(copyUser.id,copyUser))
    }
    // Handle different states: loading, error, and data
    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center h-screen">Error: {error.message}</div>;
    }

    if (!product) {
        return <div className="flex items-center justify-center h-screen">Product not found.</div>;
    }

    return product ? (
        <div className="bg-[#FCF7E6] min-h-screen py-8 md:py-16  relative z-20 ">
            <div className="container mt-20 mx-auto px-4 sm:px-6 lg:px-18">
                <div className="flex flex-col lg:flex-row bg-[#dedace] rounded-lg shadow-lg overflow-hidden">
                    {/* Product Image Section */}
                    <div className="lg:w-1/2 p-6 flex items-center justify-center  ">
                        {/* Default image (product.image[0]) */}

                        <div className='relative group lg:w-full'>
                            <img
                                className=' w-fit lg:w-full lg:h-[78vh] lg:object-cover rounded-lg  transition-opacity duration-300 group-hover:opacity-0'
                                src={product.image[0]}
                                alt={product.title}
                            />

                            {/* Hover image (product.image[1]) - positioned absolutely to overlay */}
                            {/* Only render if product.image[1] exists */}
                            {product.image[1] && (
                                <img
                                    className='absolute inset-0  w-fit  lg:w-full lg:h-[78vh] lg:object-cover rounded-lg  opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                                    src={product.image[1]}
                                    alt={`${product.title} (hover)`}
                                />
                            )}
                        </div>

                    </div>

                    {/* Product Details Section */}
                    <div className="lg:w-1/2 p-8 md:p-12 lg:p-16">
                        <h1 className="text-3xl sm:text-4xl 2xl:text-5xl  font-bold text-gray-800 mb-2">{product.title}</h1>

                        {/* Reviews */}
                        <div className="flex items-center mb-4">
                            <div className="flex text-yellow-400 mr-2">
                                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                            </div>
                            <span className="text-sm text-gray-500">(2 customer reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline mb-6">
                            <span className="text-gray-600 line-through text-2xl md:text-3xl mr-3">Rs. {product.price + 350}</span>
                            <span className="text-[#8d2f2f] font-bold text-3xl md:text-4xl">Rs. {product.price}</span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
                            {product.description}
                        </p>

                        {/* Add to Cart Section */}
                        <div className="flex items-center mb-8 max-[411px]:flex-col max-[411px]:gap-y-5 ">
                            <div className=" max-[411px]:w-full max-[411px]:mr-0 flex items-center border border-gray-700 rounded-md overflow-hidden mr-4 ">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className="max-[411px]:w-1/4 px-4 py-2 text-gray-600 hover:bg-gray-200 transition cursor-pointer "
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    value={quantity}
                                    readOnly
                                    className="max-[411px]:w-1/2 w-12 text-center border-x border-gray-700 py-2 outline-none"
                                />
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className=" max-[411px]:w-1/4 px-4 py-2 text-gray-600 hover:bg-gray-200 transition cursor-pointer"
                                >
                                    +
                                </button>
                            </div>
                            <button onClick = {()=>AddToCartHandler(product)} className=" max-[411px]:w-full bg-[#ba964d] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#9C824E] transition flex-grow cursor-pointer active:scale-[0.97
                            ]">
                                ADD TO CART
                            </button>
                        </div>

                        {/* Product Meta Info */}
                        <div className="text-gray-600 text-sm space-y-2 font-sans">
                            <p className='text-gray-500'>
                                <strong className="font-semibold text-gray-800">SKU:</strong> 23a
                            </p>
                            <p>
                                <strong className="font-semibold text-gray-800">CATEGORY:</strong> <span className="text-gray-500">{product.category}</span>
                            </p>
                            <p>
                                <strong className="font-semibold text-gray-800">TAG:</strong> <span className="text-gray-500">{product.title}</span>
                            </p>
                        </div>

                        <hr className="my-8 border-gray-600" />

                        {/* Social Share */}
                        <div className="flex items-center">
                            <span className="text-gray-600 font-semibold mr-4">SHARE:</span>
                            <div className="flex space-x-3 text-gray-500">
                                <a href="#" aria-label="Share on Facebook" className="hover:text-gray-800 text-[#3a97df] transition"><FaFacebookF /></a>
                                <a href="#" aria-label="Share on Twitter" className="hover:text-gray-800 text-[#466fc7] transition"><FaTwitter /></a>
                                <a href="#" aria-label="Share on Instagram" className="hover:text-gray-800 text-[#cc2bec] transition"><FaInstagram /></a>
                                <a href="#" aria-label="Share on Pinterest" className="hover:text-gray-800 text-[red] transition"><FaPinterestP /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {user && user?.isAdmin && <UpdateProduct product={product}/>}
        </div>
    ) : "Loading";
};

export default ProductPage;
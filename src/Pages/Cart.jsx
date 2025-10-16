import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncUpdateUser } from '../store/actions/userActions'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify';
// Import the CSS for react-toastify if you haven't already in your main app file
// import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.userReducer.users)

  const IncreaseQuantityHandler = (index) => {
    const copyUser = { ...users, cart: [...users.cart] }
    copyUser.cart[index] = {
      ...copyUser.cart[index],
      quantity: copyUser.cart[index].quantity + 1,
    }
    dispatch(asyncUpdateUser(copyUser.id, copyUser))
  }

  const DecreaseQuantityHandler = (index) => {
    const copyUser = { ...users, cart: [...users.cart] }
    if (copyUser.cart[index].quantity > 1) {
      copyUser.cart[index] = {
        ...copyUser.cart[index],
        quantity: copyUser.cart[index].quantity - 1,
      }
    } else {
      copyUser.cart.splice(index, 1)
    }
    dispatch(asyncUpdateUser(copyUser.id, copyUser))
  }

  const subtotal = users?.cart?.reduce(
    (acc, c) => acc + c.product.price * c.quantity,
    0
  )
  const shipping = users?.cart?.length > 0 ? 50 : 0
  const total = subtotal + shipping

  // --- START: UPDATED PaymentHandler and Toast Component ---
  const OrderToastContent = ({ subtotal, shipping, total, itemCount }) => (
    <div className='p-2'>
      <h3 className='text-xl font-bold text-[#38761D] mb-2'>✅ Order Placed Successfully! ☕</h3>
      <p className='text-sm text-[#5B2C06] font-medium mb-2'>Your coffee is brewing and will be delivered soon!</p>
      <div className='border-t border-gray-200 pt-2'>
        <div className='flex justify-between text-sm'>
          <span className='text-gray-600'>Items ({itemCount})</span>
          <span className='font-medium'>Rs. {subtotal.toFixed(2)}</span>
        </div>
        <div className='flex justify-between text-sm'>
          <span className='text-gray-600'>Shipping</span>
          <span className='font-medium'>Rs. {shipping.toFixed(2)}</span>
        </div>
        <div className='flex justify-between font-bold text-base mt-1 text-[#5B2C06]'>
          <span>Total</span>
          <span>Rs. {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );


  const PaymentHandler = () => {
    if (users?.cart?.length === 0) {
      toast.error("Your cart is empty. Add some items to place an order!");
      return;
    }

    toast.success(
      <OrderToastContent
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        itemCount={users.cart.length}
      />,
      {
        // Custom CSS styling (using react-toastify config)
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // Custom classNames (assuming you have Tailwind CSS or similar available globally)
        // If you are using plain CSS, you'd define these classes in a CSS file.
        className: 'bg-[#FCF7E6] border border-[#E3D3B5] rounded-xl shadow-xl p-0', // Applied to the toast container
        bodyClassName: 'p-0', // Removes padding inside the body
        progressClassName: 'bg-[#E17B25]', // Custom color for the progress bar
      }
    );

    // Optional: Clear the cart after successful payment simulation (Requires a new action/reducer logic)
    // dispatch(asyncUpdateUser(users.id, { ...users, cart: [] })) 
  }
  // --- END: UPDATED PaymentHandler and Toast Component ---

  return (
    <div className='relative bg-[#FCF7E6] min-h-screen w-full py-20 px-4 flex flex-col items-center z-20 '>
      <h1 className='text-3xl md:text-4xl font-bold text-[#5B2C06] mb-10 text-center tracking-widest pt-20'>
        YOUR COFFEE ORDER
      </h1>

      {users?.cart?.length === 0 ? (
        <p className='text-center text-lg text-[#5B2C06]'>
          ☕ No items added to cart
        </p>
      ) : (
        <div className='w-full max-w-6xl flex flex-col lg:flex-row gap-8'>
          {/* Cart Items */}
          <ul className='flex-1 flex flex-col gap-6'>
            {users.cart.map((c, index) => (
              <li
                key={c.product.id}
                className='flex flex-col md:flex-row items-center justify-between bg-white rounded-xl shadow-md p-4 md:p-6 border border-[#E3D3B5]'
              >
                {/* Left */}
                <div className='flex items-center gap-4 w-full md:w-auto'>
                  <div className='w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg border border-[#E3D3B5]'>
                    <img
                      src={c.product.image[0]}
                      alt={c.product.title}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div>
                    <NavLink to={`/products/${c.product.id}`} className='text-lg font-semibold text-[#5B2C06]'>
                      {c.product.title}
                    </NavLink>
                    <p className='text-sm text-[#7B5E2E]'>
                      Rs. {c.product.price.toFixed(2)} / unit
                    </p>
                    <p className='text-xs uppercase text-[#A67C52] tracking-wide'>
                      Category: {c.product.category || 'Coffee'}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className='flex items-center gap-3 mt-4 md:mt-0'>
                  <button
                    onClick={() => DecreaseQuantityHandler(index)}
                    className='w-8 h-8 rounded-full bg-[#E17B25] text-white font-bold hover:bg-[#D26A1F] transition'
                  >
                    -
                  </button>
                  <span className='text-lg font-medium text-[#5B2C06] w-6 text-center'>
                    {c.quantity}
                  </span>
                  <button
                    onClick={() => IncreaseQuantityHandler(index)}
                    className='w-8 h-8 rounded-full bg-[#E17B25] text-white font-bold hover:bg-[#D26A1F] transition'
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Order Summary */}
          <div className='w-full lg:w-80 bg-white rounded-xl shadow-lg border border-[#E3D3B5] p-6 self-start'>
            <h2 className='text-xl font-semibold text-[#5B2C06] border-b border-[#E3D3B5] pb-3 mb-4'>
              ORDER SUMMARY
            </h2>
            <div className='flex justify-between mb-2 text-[#5B2C06]'>
              <span>Subtotal ({users.cart.length} items)</span>
              <span>Rs. {subtotal.toFixed(2)}</span>
            </div>
            <div className='flex justify-between mb-4 text-[#5B2C06]'>
              <span>Shipping (estimate)</span>
              <span className='text-green-600'>
                {shipping > 0 ? `Rs. ${shipping.toFixed(2)}` : 'Rs. 0.00'}
              </span>
            </div>
            <div className='flex justify-between font-bold text-[#5B2C06] text-lg border-t border-[#E3D3B5] pt-3 mb-6'>
              <span>Order Total</span>
              <span>Rs. {total.toFixed(2)}</span>
            </div>
            <button onClick={PaymentHandler} className='w-full bg-[#E17B25] text-white py-3 rounded-lg font-semibold tracking-wide hover:bg-[#D26A1F] transition'>
              PROCEED TO CHECKOUT
            </button>
            <p className='text-xs text-center text-[#7B5E2E] mt-2'>
              Taxes calculated at checkout
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
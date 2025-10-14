import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncUpdateUser } from '../store/actions/userActions'
import { NavLink } from 'react-router-dom'

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
            <button className='w-full bg-[#E17B25] text-white py-3 rounded-lg font-semibold tracking-wide hover:bg-[#D26A1F] transition'>
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


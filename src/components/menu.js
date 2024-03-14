import React, { useState } from 'react';
import { useCartStore } from '../zustand/store';

const Menu = () => {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCartStore(state => ({
    cart: state.cart,
    removeFromCart: state.removeFromCart,
    clearCart: state.clearCart,
    increaseQuantity: state.increaseQuantity,
    decreaseQuantity: state.decreaseQuantity,
  }));


  const totalAmount = cart.reduce((total, product) => total + parseInt(product.price) * product.quantity, 0);
  
  const removeQuantity = (productId) => {
    decreaseQuantity(productId);
  };
  
  const addQuantity = (productId) => {
    increaseQuantity(productId);
  };

  return (
    <div className='container mx-auto px-4 pt-[90px] md:pt-[110px] lg:pt-[110px] h-screen '>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      <div className="mt-8 ">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <div className="bg-white rounded-md shadow-md p-4">
          <p className="text-gray-600">Subtotal: ${totalAmount}</p> 
          <p className="text-gray-600">Shipping: $X.XX</p>
          <hr className="my-2" />
          <p className="text-lg font-semibold">Total: ${totalAmount}</p>
        </div>
        <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md">Proceed to Checkout</button>
      </div>
        {cart.map((product) => (
          <div key={product.id} className='border rounded-lg p-4'>
            <>
              <img className='w-full h-auto mb-4' src={product.img} alt="NotFound" />
              <div className='flex justify-between items-center'>
                <span className='text-lg font-bold'>{product.name}</span>
                <div className="flex items-center text-center">
                  <button className='bg-gray-300 hover:bg-gray-400 w-[50px] text-gray-800 font-semibold py-1 px-2 rounded-l text-[25px]' onClick={() => removeQuantity(product.id)}>-</button>
                  <span className='text-sm text-gray-500 px-2'>{product.quantity}</span>
                  <button className='bg-gray-300 hover:bg-gray-400 w-[50px] text-gray-800 font-semibold py-1 px-2 rounded-r text-[25px]' onClick={() => addQuantity(product.id)}>+</button>
                </div>
              </div>
              <div className='flex justify-between items-center mt-2'>
                <span className='text-lg font-semibold'>${parseInt(product.price) * product.quantity}</span>
                <button className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md' onClick={() => removeFromCart(product.id)}>Remove</button>
              </div>
            </>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div className='flex justify-end mt-8'>
          <button className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md' onClick={clearCart}>Clear Cart</button>
        </div>
      )}
      
    </div>
  );
}

export default Menu;

import React, { useEffect } from 'react';
import { useCartStore } from '../zustand/store';
import { db } from './authentication';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import { collection, updateDoc, doc, setDoc, getDocs } from "firebase/firestore"; 



const Menu = () => {
  const {
    cart,
    setCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity
  } = useCartStore((state) => ({
    cart: state.cart,
    setCart: state.setCart,
    removeFromCart: state.removeFromCart,
    clearCart: state.clearCart,
    increaseQuantity: state.increaseQuantity,
    decreaseQuantity: state.decreaseQuantity,
  }));

  const userInfo = useGetUserInfo();

  useEffect(() => {
    const updateCartInFirestore = async () => {
      try {
        if (userInfo.userId) {
          const userRef = doc(db, "users", userInfo.userId);
          await setDoc(userRef, { cart });
        }
      } catch (error) {
        console.error('Error updating user cart:', error);
      }
    };
    updateCartInFirestore();
  }, [cart, userInfo.userId]);
  // useEffect(() => {
  //   localStorage.setItem('cart', JSON.stringify(cart));
  // }, [cart]);


  
  const totalAmount = cart.reduce(
    (total, product) => total + parseInt(product.price) * product.quantity,
    0
  );

  const removeQuantity = (productId) => {
    decreaseQuantity(productId);
  };

  const addQuantity = (productId) => {
    increaseQuantity(productId);
  };

  return (
    <div className="container mx-auto px-4 pt-[90px] md:pt-[110px] lg:pt-[110px] h-screen ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="mt-8 shadow-md">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="bg-white rounded-md shadow-md p-4">
            <p className="text-gray-600">Subtotal: ₹{totalAmount}</p>
            <p className="text-gray-600">Shipping: ₹X.XX</p>
            <hr className="my-2" />
            <p className="text-lg font-semibold">Total: ₹{totalAmount}</p>
            <br />
            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md">
            Proceed to Checkout
          </button>
          </div>
          
        </div>
        {cart.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <div className='items-center'>
              <img
                className="w-[200px] self-center object-contain h-[200px] mb-4"
                src={product.img}
                alt="NotFound"
              />
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">{product.name}</span>
                <div className="flex items-center text-center">
                  <button
                    className="bg-gray-300 hover:bg-gray-400 w-[50px] text-gray-800 font-semibold py-1 px-2 rounded-l text-[25px]"
                    onClick={() => removeQuantity(product.id)}
                  >
                    -
                  </button>
                  <span className="text-sm text-gray-500 px-2">
                    {product.quantity}
                  </span>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 w-[50px] text-gray-800 font-semibold py-1 px-2 rounded-r text-[25px]"
                    onClick={() => addQuantity(product.id)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-semibold">
                  ₹{parseInt(product.price) * product.quantity}
                </span>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;

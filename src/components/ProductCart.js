import React from 'react';
import { useCartStore } from '../zustand/store';
import { PRODUCTSLIST } from './Products'; // Import the products array
import '../App.css'
const ProductCart = () => {
    const { addToCart, decreaseQuantity, cart } = useCartStore(state => ({
        addToCart: state.addToCart,
        decreaseQuantity: state.decreaseQuantity,
        cart: state.cart,
    }));

    const getProductQuantity = (productId) => {
        const cartItem = cart.find(item => item.id === productId);
        return cartItem ? cartItem.quantity : 0;
    };

    return (
        
        <div className="p-4 md:p-8">
            <div className="max-w-screen-lg mx-auto ">
                <div className="lg:grid lg:grid-cols-3 lg:w-full lg:gap-[45px] lg:">
                    {PRODUCTSLIST.map(product => (
                        <div key={product.id} className="rounded-md shadow-lg p-4">
                            <div className="flex flex-col items-center">
                                <img src={product.img} alt={product.name} className="w-[95%] h-[400px] object-fit rounded-md mr-4" />
                                <div className='self-start p-[20px] pb-0 flex justify-between w-full items-center'>
                                    <div>
                                        <h3 className="text-lg font-semibold">{product.name}</h3>
                                        <p className="text-gray-600">Price: ₹{product.price}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <button onClick={() => decreaseQuantity(product.id)} className="bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-md shadow-md mr-2">-</button>
                                        <span 
                                        // className="text-gray-800 mr-2" 
                                        className={`text-gray-800 mr-2 ${getProductQuantity(product.id) > 0 ? 'text-lg popup' : ''}`}
                                        
                                        
                                        
                                        >{getProductQuantity(product.id)}</span>
                                        <button onClick={() => addToCart(product)} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductCart;

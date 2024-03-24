import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  setCart: (newCart) => set({ cart: newCart }),
  addToCart: (product) =>
    set((state) => {
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex !== -1) {
        // If the product already exists in the cart, update its quantity
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex].quantity += 1;
        return { cart: updatedCart };
      } else {
        // If the product doesn't exist, add it to the cart with a quantity of 1
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((product) => product.id !== productId),
    })),
  clearCart: () => set({ cart: [] }),
  increaseQuantity: (productId) =>
    set((state) => ({
      cart: state.cart.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      ),
    })),
  decreaseQuantity: (productId) =>
    set((state) => {
      const updatedCart = state.cart.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );
      return { cart: updatedCart.filter((product) => product.quantity > 0) }; // Filter out items with quantity zero
    }),
  totalAmount: () =>
    set((state) => ({
      totalAmount: state.cart.reduce(
        (total, item) => total + parseInt(item.price) * item.quantity,
        0
      ),
    })),
}));

import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Fresh Country Tomatoes",
      price_per_unit: 32.0,
      unit: "kg",
      quantity: 50,
      image_url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
      farmer_name: "Murugan (Madurai Farms)",
      location: "Madurai, TN"
    }
  ]);
  
  const [wishlist, setWishlist] = useState([2, 4]); // Product IDs

  const addToCart = (product, quantity = 10) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prev =>
        prev.map(item => item.id === productId ? { ...item, quantity: qty } : item)
      );
    }
  };

  const clearCart = () => setCartItems([]);

  const toggleWishlist = (productId) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price_per_unit * item.quantity), 0);
  const deliveryFee = cartItems.length > 0 ? 50.0 : 0.0;
  const cartTotal = cartSubtotal + deliveryFee;

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartSubtotal,
      deliveryFee,
      cartTotal,
      wishlist,
      toggleWishlist
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

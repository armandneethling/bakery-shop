/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    decrementQuantity: (id: number) => void;
    getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        console.log('Adding item to cart:', item);
        setCartItems((prev) => {
            const existingItem = prev.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                console.log('Item already in cart, updating quantity.');
                return prev.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            console.log('New item, adding to cart.');
            return [...prev, { ...item, quantity: 1 }];
        });
    };       

    const removeFromCart = (id: number) => {
        setCartItems((prev) => prev.filter(item => item.id !== id));
    };

    const decrementQuantity = (id: number) => {
        setCartItems((prev) => {
            return prev.map((cartItem) => 
                cartItem.id === id && cartItem.quantity > 1
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            ).filter((cartItem) => cartItem.quantity > 0);
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, decrementQuantity, getTotalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

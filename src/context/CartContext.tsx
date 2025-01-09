/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import { notify } from '../components/ToastNotification'; // Ensure notify is imported

export interface CartItem {  // Export CartItem
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
}

export type CartContextType = {  // Use 'export type' for CartContextType
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    decrementQuantity: (id: number) => void;
    getTotalPrice: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
            let updatedItems;
            if (existingItem) {
                updatedItems = prevItems.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity } // Update quantity
                        : cartItem
                );
            } else {
                updatedItems = [...prevItems, item];
            }
            console.log('Cart items after addition:', updatedItems);
            notify('Added to cart');
            return updatedItems;
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
        notify('Item removed from cart');
    };

    const decrementQuantity = (id: number) => {
        setCartItems(prevItems => {
            const updatedItems = prevItems.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ).filter(item => item.quantity > 0); // Remove item if quantity reaches zero
            notify('Item quantity decreased');
            return updatedItems;
        });
    };

    const clearCart = () => {
        setCartItems([]);
        notify('Cart cleared');
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

export { CartContext }; // Ensure CartContext is exported

export const useCart = (): CartContextType => {
    const context = useContext<CartContextType | undefined>(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

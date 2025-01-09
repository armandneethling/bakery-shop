/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { notify } from '../components/ToastNotification';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
}

export type CartContextType = {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    decrementQuantity: (id: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // This empty useEffect ensures that state updates don't occur during the render phase
    }, []);

    const addToCart = (item: CartItem) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
            let updatedItems;
            if (existingItem) {
                updatedItems = prevItems.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
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
            ).filter(item => item.quantity > 0);
            notify(updatedItems.some(item => item.id === id) ? 'Item quantity decreased' : 'Item removed from cart');
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
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, decrementQuantity, clearCart, getTotalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext };

export const useCart = (): CartContextType => {
    const context = useContext<CartContextType | undefined>(CartContext);
    if (!context) {
        throw new Error('useCart must be used inside a CartProvider');
    }
    return context;
};

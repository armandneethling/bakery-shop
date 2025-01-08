import React, { createContext, useContext, useState } from 'react';
import { notify } from '../components/ToastNotification'; 

interface CartItem {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    decrementQuantity: (id: number) => void;
    getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: Omit<CartItem, 'quantity'>) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
            let updatedItems;
            if (existingItem) {
                updatedItems = prevItems.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                updatedItems = [...prevItems, { ...item, quantity: 1 }];
            }
            console.log('Cart items after addition:', updatedItems);
            notify('Added to cart'); // Show toast notification
            return updatedItems;
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
        notify('Item removed from cart');
    };

    const decrementQuantity = (id: number) => {
        setCartItems(prevItems => 
            prevItems.map(item =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
        notify('Item quantity decreased');
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

import { useState } from 'react';
import { HiOutlineTrash, HiOutlineMinusCircle } from 'react-icons/hi';
import { MdShoppingCart } from 'react-icons/md';
import { FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import CheckoutPopup from './CheckoutPopup';
import { useCart, CartItem } from '../context/CartContext';

const CartList = () => {
    const { cartItems, getTotalPrice, removeFromCart, decrementQuantity, clearCart } = useCart();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <>
            {cartItems.length > 0 ? (
                <div className="p-4">
                    <h3 className="text-3xl font-semibold mb-6 text-center text-bakery-brown">Your Cart Items</h3>
                    <ul className="space-y-4">
                        {cartItems.map((item: CartItem) => (
                            <li key={item.id} className="flex justify-between items-center border p-4 rounded-lg shadow-lg bg-white">
                                <div className="flex items-center space-x-4">
                                    <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                                    <div>
                                        <h4 className="text-lg font-bold text-bakery-brown">{item.name}</h4>
                                        <p className="text-base text-gray-700">Price: R{item.price.toFixed(2)}</p>
                                        <p className="text-base text-gray-700">Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button 
                                        onClick={() => decrementQuantity(item.id)} 
                                        className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition duration-300"
                                    >
                                        <HiOutlineMinusCircle size={20} />
                                    </button>
                                    <button 
                                        onClick={() => removeFromCart(item.id)} 
                                        className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition duration-300"
                                    >
                                        <HiOutlineTrash size={20} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="text-2xl font-bold mt-6 text-center text-bakery-brown">Total Price: R{getTotalPrice().toFixed(2)}</div>
                    
                    <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded shadow-md text-center">
                        <strong>Note:</strong> We do not offer delivery services. Please come collect your order at this address: 
                        <a 
                            href="https://maps.google.com/?q=The+Highlands+32+Barney+Road+Port+Elizabeth" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="cart-location-link flex items-center justify-center mt-2"
                        >
                            <FiMapPin className="mr-2" />
                            The Highlands 32, Barney Road, Port Elizabeth
                        </a>.
                    </div>

                    <div className="mt-6 text-center">
                        <button onClick={() => setIsPopupOpen(true)} className="py-2 px-4 bg-bakery-yellow text-bakery-brown rounded-lg hover:bg-yellow-300 transition-colors duration-300">
                            Proceed to Checkout
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <button onClick={clearCart} className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300">
                            Clear Cart
                        </button>
                    </div>

                    {isPopupOpen && (
                        <CheckoutPopup onClose={() => setIsPopupOpen(false)} />
                    )}
                </div>
            ) : (
                <div className="empty-cart-message flex flex-col items-center">
                    <p className="text-center text-gray-600">Your cart is empty. Please add items before proceeding to checkout.</p>
                    <Link to="/products" className="mt-4 flex items-center space-x-2 bg-bakery-yellow text-bakery-brown py-2 px-4 rounded-lg hover:bg-yellow-300 transition duration-300">
                        <MdShoppingCart size={24} />
                        <span>Start Shopping</span>
                    </Link>
                </div>
            )}
        </>
    );
};

export default CartList;

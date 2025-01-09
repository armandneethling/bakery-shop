import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { notify } from './ToastNotification';
import sendEmail from '../services/emailService';

interface CheckoutPopupProps {
    onClose: () => void;
}

const CheckoutPopup: React.FC<CheckoutPopupProps> = ({ onClose }) => {
    const { cartItems, clearCart, getTotalPrice } = useCart();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePhone = (phone: string) => {
        const re = /^\d{10}$/; // Adjust as needed for your phone format
        return re.test(phone);
    };

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !phone || !email) {
            notify("Please fill in all fields.");
            return;
        }

        if (!validateEmail(email)) {
            notify("Please enter a valid email address.");
            return;
        }

        if (!validatePhone(phone)) {
            notify("Please enter a valid phone number.");
            return;
        }

        const emailDetails = {
            email: email,
            name: name,
            orderDetails: cartItems,
            total: getTotalPrice().toFixed(2),
        };

        console.log("Email details:", emailDetails);

        setIsLoading(true);

        try {
            await sendEmail(emailDetails);
            notify("Thank you for your purchase! An email confirmation has been sent.");
            clearCart();
            setName('');
            setPhone('');
            setEmail('');
            onClose();
        } catch (error) {
            notify("There was an issue sending the confirmation email. Please try again.");
            console.error("Email sending error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center text-bakery-brown">Complete Your Checkout</h2>
                <form onSubmit={handleCheckout}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
                        <input 
                            type="tel" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)} 
                            required 
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button 
                            type="submit" 
                            className="bg-bakery-yellow hover:bg-yellow-300 text-bakery-brown font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Sending...' : 'Complete Checkout'}
                        </button>
                        <button 
                            onClick={onClose} 
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPopup;

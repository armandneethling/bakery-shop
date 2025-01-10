import React, { useState } from 'react';
import { useForm, Controller, FieldValues } from "react-hook-form";
import { useCart } from '../context/CartContext';
import { notify } from './ToastNotification';
import sendEmail from '../services/emailService';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface CheckoutPopupProps {
    onClose: () => void;
}

const CheckoutPopup: React.FC<CheckoutPopupProps> = ({ onClose }) => {
    const { cartItems, clearCart, getTotalPrice } = useCart();
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: FieldValues) => {
        const emailDetails = {
            email: data.email as string,
            name: data.name as string,
            phone: data.phone as string,
            orderDetails: cartItems,
            total: getTotalPrice().toFixed(2),
        };

        console.log("Email details:", emailDetails);

        setIsLoading(true);

        try {
            await sendEmail(emailDetails);
            notify("Thank you for your purchase! An email confirmation has been sent.");
            clearCart();
            onClose();
        } catch (error) {
            notify("There was an issue sending the confirmation email. Please try again.");
            console.error("Email sending error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-8 checkout-popup-container">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full my-auto overflow-hidden">
                <h2 className="text-2xl font-bold mb-6 text-center text-bakery-brown">Complete Your Checkout</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Name:<span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Name is required" }}
                            render={({ field }) => (
                                <input 
                                    {...field}
                                    type="text" 
                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            )}
                        />
                        {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message as string}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Phone Number:<span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Phone number is required" }}
                            render={({ field }) => (
                                <PhoneInput
                                    {...field}
                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            )}
                        />
                        {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone.message as string}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email:<span className="text-red-500">*</span>
                        </label>
                        <Controller 
                            name="email" 
                            control={control} 
                            defaultValue="" 
                            rules={{
                                required: "Email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid email address"
                                }
                            }}
                            render={({ field }) => (
                                <input 
                                    {...field}
                                    type="email" 
                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            )}
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message as string}</p>}
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

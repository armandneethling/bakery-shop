import React, { useState } from 'react';
import axios from 'axios';

interface CheckoutFormProps {
    onClose: () => void;
    onOrderSuccess: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onClose, onOrderSuccess }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [orderDetails, setOrderDetails] = useState([{ name: '', quantity: 0, price: 0 }]);
    const [total, setTotal] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const emailDetails = {
            email,
            name,
            orderDetails,
            total,
        };

        try {
            await axios.post('/api/send-email', emailDetails);
            onOrderSuccess();
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const handleAddItem = () => {
        setOrderDetails([...orderDetails, { name: '', quantity: 0, price: 0 }]);
    };

    const handleItemChange = (index: number, field: string, value: any) => {
        const newOrderDetails = [...orderDetails];
        newOrderDetails[index] = { ...newOrderDetails[index], [field]: value };
        setOrderDetails(newOrderDetails);
    };

    return (
        <div className="checkout-form-container">
            <form onSubmit={handleSubmit} className="checkout-form">
                <h2>Checkout</h2>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                {orderDetails.map((item, index) => (
                    <div key={index} className="form-group">
                        <label htmlFor={`item-name-${index}`}>Item Name</label>
                        <input
                            type="text"
                            id={`item-name-${index}`}
                            value={item.name}
                            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                        />
                        <label htmlFor={`item-quantity-${index}`}>Quantity</label>
                        <input
                            type="number"
                            id={`item-quantity-${index}`}
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                        />
                        <label htmlFor={`item-price-${index}`}>Price</label>
                        <input
                            type="number"
                            id={`item-price-${index}`}
                            value={item.price}
                            onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddItem}>Add Item</button>
                <div className="form-group">
                    <label htmlFor="total">Total</label>
                    <input
                        type="text"
                        id="total"
                        value={total}
                        onChange={(e) => setTotal(e.target.value)}
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit">Place Order</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;
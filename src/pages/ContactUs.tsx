import { useState } from 'react';
import { notify } from '../components/ToastNotification';
import { sendContactEmail } from '../services/emailService'; // Import the email service

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);  // Track loading state

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !phone || !message) {
            notify("Please fill in all fields.");
            return;
        }

        const emailDetails = {
            email,
            name,
            phone,
            message,
        };

        setIsLoading(true);

        try {
            await sendContactEmail(emailDetails);
            notify("Thank you for contacting us! We will get back to you soon.");
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
        } catch (error) {
            notify("There was an issue submitting your request. Please try again.");
            console.error('Contact email error:', error);
        } finally {
            setIsLoading(false);  // Hide loading indicator
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-4xl font-semibold text-bakery-brown mb-8 text-center">Contact Us</h2>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
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
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
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
                    <label className="block text-gray-700 text-sm font-bold mb-2">Message:</label>
                    <textarea 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        required 
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                    ></textarea>
                </div>
                <div className="flex items-center justify-between">
                    <button 
                        type="submit" 
                        className="bg-bakery-yellow hover:bg-yellow-300 text-bakery-brown font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending...' : 'Send Message'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactUs;

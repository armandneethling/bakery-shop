import { useState } from 'react';
import { notify } from '../components/ToastNotification';
import { sendCakeOrderEmail } from '../services/emailService'; // Import the email service

const CakeOrderingForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // Track loading state

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!customerName || !contactNumber || !customerEmail) {
      notify('Please fill in all fields.');
      return;
    }

    const emailDetails = {
      email: customerEmail,
      name: customerName,
      phone: contactNumber,
      orderDetails: [{ name: 'Cake', quantity: 1, price: 100 }], // Example order details with 'price' as number
      total: '100', // Example total
    };

    setIsLoading(true);

    try {
      await sendCakeOrderEmail(emailDetails);
      notify('Your cake order has been submitted!');
      setCustomerName('');
      setContactNumber('');
      setCustomerEmail('');
      setAdditionalInfo('');
    } catch (error) {
      notify('There was an issue submitting your cake order. Please try again.');
      console.error('Cake order email error:', error);
    } finally {
      setIsLoading(false);  // Hide loading indicator
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-bakery-brown mb-6">
        Order Your Cake
      </h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="customerName" className="block text-sm font-medium text-bakery-brown">
            Name
          </label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contactNumber" className="block text-sm font-medium text-bakery-brown">
            Contact Number
          </label>
          <input
            type="text"
            id="contactNumber"
            value={contactNumber}
            onChange={(event) => setContactNumber(event.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="customerEmail" className="block text-sm font-medium text-bakery-brown">
            Email
          </label>
          <input
            type="email"
            id="customerEmail"
            value={customerEmail}
            onChange={(event) => setCustomerEmail(event.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="additionalInfo" className="block text-sm font-medium text-bakery-brown">
            Additional Information
          </label>
          <textarea
            id="additionalInfo"
            value={additionalInfo}
            onChange={(event) => setAdditionalInfo(event.target.value)}
            rows={4}
            className="border rounded w-full p-2"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit Order'}
        </button>
      </form>
    </div>
  );
};

export default CakeOrderingForm;

import axios from 'axios';

interface EmailDetails {
    email: string;
    name: string;
    orderDetails: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
    total: string;
}

const sendEmail = async (emailDetails: EmailDetails): Promise<void> => {
    const apiKey = 'xkeysib-39e7dec35a1d361cf272ed61930d2177fb04d6410459dbfcaaac37d89857aa53'; // Your API key
    const url = 'https://api.sendinblue.com/v3/smtp/email';
    const headers = {
        'Content-Type': 'application/json',
        'api-key': apiKey,
    };
    const body = {
        to: [
            {
                email: emailDetails.email,
                name: emailDetails.name,
            },
        ],
        sender: {
            email: 'homebakedrusks@gmail.com',
            name: 'Your Bakery',
        },
        subject: 'Order Confirmation',
        htmlContent: `<p>Hello ${emailDetails.name},</p><p>Thank you for your order!</p><p>Order Details:</p><ul>${emailDetails.orderDetails.map(item => `<li>${item.name}: ${item.quantity} x R${item.price}</li>`).join('')}</ul><p>Total: R${emailDetails.total}</p>`,
    };

    try {
        const response = await axios.post(url, body, { headers });
        console.log('Email sent successfully:', response.data);
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error('Error sending email:', err.response ? err.response.data : err.message);
        } else {
            console.error('Unexpected error:', err);
        }
    }
};

export default sendEmail;

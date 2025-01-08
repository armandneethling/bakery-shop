import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

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
    const apiKey = process.env.SENDINBLUE_API_KEY;
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

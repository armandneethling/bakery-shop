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
    const url = '/api/send-email';
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.post(url, emailDetails, { headers });
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
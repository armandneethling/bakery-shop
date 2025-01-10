import axios from 'axios';

interface EmailDetails {
    email: string;
    name: string;
    phone: string;
    orderDetails: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
    total: string;
}

interface CakeOrderDetails {
    email: string;
    name: string;
    phone: string;
    additionalInfo: string;
}

interface ContactDetails {
    email: string;
    name: string;
    phone: string;
    message: string;
}

const BASE_URL = 'https://homebakedrusks.vercel.app/api';

export const sendCakeOrderEmail = async (emailDetails: CakeOrderDetails): Promise<void> => {
    const url = `${BASE_URL}/send-cake-order-email`;
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.post(url, emailDetails, { headers });
        console.log('Cake order email sent successfully:', response.data);
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error('Error sending cake order email:', err.response ? err.response.data : err.message);
        } else {
            console.error('Unexpected error:', err);
        }
    }
};

export const sendContactEmail = async (emailDetails: ContactDetails): Promise<void> => {
    const url = `${BASE_URL}/send-contact-email`;
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.post(url, emailDetails, { headers });
        console.log('Contact email sent successfully:', response.data);
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error('Error sending contact email:', err.response ? err.response.data : err.message);
        } else {
            console.error('Unexpected error:', err);
        }
    }
};
export const sendEmail = async (emailDetails: EmailDetails): Promise<void> => {
    const url = `${BASE_URL}/send-checkout-email`;
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

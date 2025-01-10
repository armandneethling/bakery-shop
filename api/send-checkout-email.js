import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export default async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://bakery-shop-1p9qfucnm-armandneethlings-projects.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    const emailDetails = req.body;
    console.log('Received checkout email details:', emailDetails);

    const apiKey = process.env.SENDINBLUE_API_KEY;
    console.log('Sendinblue API Key:', apiKey);

    const url = 'https://api.sendinblue.com/v3/smtp/email';
    const headers = {
        'Content-Type': 'application/json',
        'api-key': apiKey,
    };

    const companyEmailBody = {
        to: [{ email: 'homebakedrusks@gmail.com', name: 'HomeBaked Rusks' }],
        sender: { email: emailDetails.email, name: emailDetails.name },
        subject: 'New Order Received',
        htmlContent: `<p>New order received from ${emailDetails.name}.</p><hr><p><strong>Client Information</strong></p><p>Name: ${emailDetails.name}</p><p>Phone number: ${emailDetails.phone}</p><p>Email: ${emailDetails.email}</p><hr><p><strong>Order Details</strong></p><ul>${emailDetails.orderDetails.map(item => `<li>${item.name} (Quantity: ${item.quantity}, Price: ${item.price})</li>`).join('')}</ul><p>Total: ${emailDetails.total}</p>`,
    };

    try {
        console.log('Sending company email with body:', companyEmailBody);
        const companyResponse = await axios.post(url, companyEmailBody, { headers });
        console.log('Company email sent successfully:', companyResponse.data);

        res.status(200).send('Company email sent successfully');
    } catch (err) {
        console.error('Error sending company email:', err.response ? err.response.data : err.message);
        res.status(500).send('Error sending company email');
    }
};

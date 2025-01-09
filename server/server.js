const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

const cors = require('cors');
// Add this line to allow requests from your client
app.use(cors({ origin: 'http://localhost:5173' }));

app.post('/api/send-email', async (req, res) => {
    const emailDetails = req.body;
    console.log('Received email details:', emailDetails);

    const apiKey = process.env.SENDINBLUE_API_KEY;
    const url = 'https://api.sendinblue.com/v3/smtp/email';
    const headers = {
        'Content-Type': 'application/json',
        'api-key': apiKey,
    };
    const body = {
        to: [{ email: emailDetails.email, name: emailDetails.name }],
        sender: { email: 'homebakedrusks@gmail.com', name: 'Your Bakery' },
        subject: 'Order Confirmation',
        htmlContent: `<p>Hello ${emailDetails.name},</p><p>Thank you for your order!</p><p>Order Details:</p><ul>${emailDetails.orderDetails.map(item => `<li>${item.name}: ${item.quantity} x R${item.price}</li>`).join('')}</ul><p>Total: R${emailDetails.total}</p>`,
    };

    try {
        console.log('Sending email with body:', body);
        const response = await axios.post(url, body, { headers });
        console.log('Email sent successfully:', response.data);
        res.status(200).send('Email sent successfully');
    } catch (err) {
        console.error('Sending email failed:', {
            message: err.message || 'Unknown error',
            response: err.response ? err.response.data : 'No response data',
            status: err.response ? err.response.status : 'No status code'
        });
        res.status(500).send('Error sending email');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

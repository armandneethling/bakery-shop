const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

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
        console.error('Error sending email:', err.response ? err.response.data : err.message);
        res.status(500).send('Error sending email');
    }
});

app.post('/api/receive-email', async (req, res) => {
    const emailDetails = req.body;
    console.log('Received customer email:', emailDetails);

    if (!emailDetails.email || !emailDetails.subject || !emailDetails.htmlContent) {
        console.error('Invalid email details:', emailDetails);
        return res.status(400).send('Invalid email details');
    }

    console.log(`Email from: ${emailDetails.email}`);
    console.log(`Subject: ${emailDetails.subject}`);
    console.log(`Content: ${emailDetails.htmlContent}`);
    
    res.status(200).send('Email received successfully');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

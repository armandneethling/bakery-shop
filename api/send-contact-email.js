const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

app.post('/api/send-contact-email', async (req, res) => {
    const emailDetails = req.body;
    console.log('Received contact email details:', emailDetails);

    const apiKey = process.env.SENDINBLUE_API_KEY;
    const url = 'https://api.sendinblue.com/v3/smtp/email';
    const headers = {
        'Content-Type': 'application/json',
        'api-key': apiKey,
    };

    // Email to Client
    const clientEmailBody = {
        to: [{ email: emailDetails.email, name: emailDetails.name }],
        sender: { email: 'homebakedrusks@gmail.com', name: 'HomeBaked Rusks' },
        subject: 'Thanks for Reaching Out!',
        htmlContent: `<p>Hello ${emailDetails.name},</p><p>Thanks for reaching out! We'll get in touch with you as soon as possible.</p>`,
    };

    // Email to Company
    const companyEmailBody = {
        to: [{ email: 'homebakedrusks@gmail.com', name: 'HomeBaked Rusks' }],
        sender: { email: emailDetails.email, name: emailDetails.name },
        subject: 'New Contact Request',
        htmlContent: `<p>New contact request from ${emailDetails.name}.</p><hr><p><strong>Client Information</strong></p><p>Name: ${emailDetails.name}</p><p>Phone number: ${emailDetails.phone}</p><p>Email: ${emailDetails.email}</p><p>Message: ${emailDetails.message}</p>`,
    };

    try {
        console.log('Sending client email with body:', clientEmailBody);
        const clientResponse = await axios.post(url, clientEmailBody, { headers });
        console.log('Client email sent successfully:', clientResponse.data);

        console.log('Sending company email with body:', companyEmailBody);
        const companyResponse = await axios.post(url, companyEmailBody, { headers });
        console.log('Company email sent successfully:', companyResponse.data);

        res.status(200).send('Emails sent successfully');
    } catch (err) {
        console.error('Error sending email:', err.response ? err.response.data : err.message);
        res.status(500).send('Error sending email');
    }
});

module.exports = (req, res) => {
    app(req, res);
};

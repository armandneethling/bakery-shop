import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export default async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    const apiKey = process.env.SENDINBLUE_API_KEY;
    console.log('Sendinblue API Key:', apiKey);

    const url = 'https://api.sendinblue.com/v3/smtp/email';
    const headers = {
        'Content-Type': 'application/json',
        'api-key': apiKey,
    };

    const testEmailBody = {
        to: [{ email: 'homebakedrusks@gmail.com', name: 'HomeBaked Rusks' }],
        sender: { email: 'testsender@example.com', name: 'Test Sender' },
        subject: 'Test Email',
        htmlContent: `<p>This is a test email.</p>`,
    };

    try {
        console.log('Sending test email with body:', testEmailBody);
        const response = await axios.post(url, testEmailBody, { headers });
        console.log('Test email sent successfully:', response.data);
        res.status(200).send('Test email sent successfully');
    } catch (err) {
        console.error('Error sending test email:', err.response ? err.response.data : err.message);
        res.status(500).send('Error sending test email');
    }
};

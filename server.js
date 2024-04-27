const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'jamnishan345@gmail.com',
        pass: 'jtsywajjaziluzdc'  
    }
});


app.post('/send-email', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        await transporter.sendMail({
            to: 'jamnishan345@gmail.com',
            subject: `New Portfolio Message from ${name}`,
            text: `Sender's Email: ${email}\nMessage: ${message}`
        });

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
